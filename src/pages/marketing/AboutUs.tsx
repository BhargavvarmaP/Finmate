import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">About Finmate</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To simplify financial compliance for businesses across India by providing
            an all-in-one platform that automates and streamlines tax filing,
            payroll management, and regulatory compliance.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-muted-foreground">
            To become India's leading financial compliance platform, empowering
            businesses to focus on growth while we handle their compliance needs
            with accuracy and efficiency.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Continuously improving our platform with cutting-edge technology
                to provide the best solutions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-muted-foreground">
                Ensuring accurate and timely compliance management that businesses
                can depend on.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-muted-foreground">
                Maintaining the highest standards of data security and privacy
                for our clients.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {/* Add team member cards here */}
        </div>
      </div>
    </motion.div>
  );
}