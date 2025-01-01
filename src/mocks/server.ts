import { createServer, Model, Response, Registry } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  businessId: string;
}

interface Business {
  id: string;
  name: string;
  type: string;
  gstNumber: string;
  email: string;
  phone: string;
  address: string;
  kycStatus: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: string;
  userId: string;
}

type AppRegistry = Registry<
  {
    user: ModelDefinition<User>;
    business: ModelDefinition<Business>;
    transaction: ModelDefinition<Transaction>;
  },
  {}
>;

type AppSchema = Schema<AppRegistry>;

// Simple token generator for mock server
const generateToken = (payload: any) => {
  return btoa(JSON.stringify(payload));
};

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model.extend<Partial<User>>({}),
      business: Model.extend<Partial<Business>>({}),
      transaction: Model.extend<Partial<Transaction>>({}),
    },

    seeds(server) {
      server.create('user', {
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        businessId: '1',
      });

      server.create('business', {
        id: '1',
        name: 'Acme Inc',
        type: 'corporation',
        gstNumber: 'GST123456789',
        email: 'contact@acme.com',
        phone: '1234567890',
        address: '123 Business St',
        kycStatus: 'pending',
      });

      // Create some sample transactions
      for (let i = 1; i <= 10; i++) {
        server.create('transaction', {
          id: i.toString(),
          date: new Date(2025, 0, i).toISOString(),
          description: `Transaction ${i}`,
          amount: Math.floor(Math.random() * 10000),
          type: i % 2 === 0 ? 'income' : 'expense',
          category: i % 2 === 0 ? 'Sales' : 'Supplies',
          status: 'completed',
          userId: '1',
        });
      }
    },

    routes() {
      this.namespace = 'api';

      // Auth endpoints
      this.post('/auth/login', (schema: AppSchema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.findBy('user', { email });

        if (!user || user.password !== password) {
          return new Response(401, {}, { error: 'Invalid credentials' });
        }

        const token = generateToken({ 
          id: user.id, 
          email: user.email, 
          businessId: user.businessId,
          fullName: user.fullName,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 1 day expiration
        });

        return new Response(200, {}, { 
          token,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            businessId: user.businessId
          }
        });
      });

      this.post('/auth/register', (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody);
        
        // Check if user already exists
        const existingUser = schema.findBy('user', { email: attrs.email });
        if (existingUser) {
          return new Response(400, {}, { error: 'Email already registered' });
        }

        const business = schema.create('business', {
          name: attrs.businessName,
          type: 'pending',
          email: attrs.email,
          phone: attrs.phone,
          kycStatus: 'pending',
        });

        const user = schema.create('user', {
          fullName: attrs.fullName,
          email: attrs.email,
          password: attrs.password,
          businessId: business.id,
        });

        const token = generateToken({ 
          id: user.id, 
          email: user.email, 
          businessId: business.id,
          fullName: user.fullName,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 1 day expiration
        });

        return new Response(200, {}, { 
          token,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            businessId: business.id
          }
        });
      });

      // Protected routes middleware
      const authenticateRequest = (request: any) => {
        const authHeader = request.requestHeaders.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new Response(401, {}, { error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        try {
          const decoded = JSON.parse(atob(token));
          const now = Math.floor(Date.now() / 1000);
          if (decoded.exp && decoded.exp < now) {
            throw new Error('Token expired');
          }
          return decoded;
        } catch (error) {
          throw new Response(401, {}, { error: 'Invalid token' });
        }
      };

      // Business endpoints
      this.get('/business', (schema: AppSchema, request) => {
        const user = authenticateRequest(request);
        const business = schema.findBy('business', { id: user.businessId });
        
        if (!business) {
          return new Response(404, {}, { error: 'Business not found' });
        }
        
        return new Response(200, {}, business);
      });

      this.put('/business', (schema: AppSchema, request) => {
        const user = authenticateRequest(request);
        const attrs = JSON.parse(request.requestBody);
        const business = schema.findBy('business', { id: user.businessId });
        
        if (!business) {
          return new Response(404, {}, { error: 'Business not found' });
        }
        
        return new Response(200, {}, business.update(attrs));
      });

      // Transaction endpoints
      this.get('/transactions', (schema: AppSchema, request) => {
        const user = authenticateRequest(request);
        return new Response(200, {}, schema.where('transaction', { userId: user.id }));
      });

      this.post('/transactions', (schema: AppSchema, request) => {
        const user = authenticateRequest(request);
        const attrs = JSON.parse(request.requestBody);
        return new Response(201, {}, schema.create('transaction', { ...attrs, userId: user.id }));
      });

      this.put('/transactions/:id', (schema: AppSchema, request) => {
        const user = authenticateRequest(request);
        const id = request.params.id;
        const transaction = schema.findBy('transaction', { id });
        
        if (!transaction) {
          return new Response(404, {}, { error: 'Transaction not found' });
        }
        
        if (transaction.userId !== user.id) {
          return new Response(403, {}, { error: 'Unauthorized' });
        }
        
        const attrs = JSON.parse(request.requestBody);
        return new Response(200, {}, transaction.update(attrs));
      });

      this.delete('/transactions/:id', (schema: AppSchema, request) => {
        const user = authenticateRequest(request);
        const id = request.params.id;
        const transaction = schema.findBy('transaction', { id });
        
        if (!transaction) {
          return new Response(404, {}, { error: 'Transaction not found' });
        }
        
        if (transaction.userId !== user.id) {
          return new Response(403, {}, { error: 'Unauthorized' });
        }
        
        transaction.destroy();
        return new Response(204, {}, {});
      });
    },
  });

  return server;
}
