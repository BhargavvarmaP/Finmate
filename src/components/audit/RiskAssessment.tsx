import { AlertTriangle, Shield, Activity } from 'lucide-react';
import { GlassPanel } from '@/components/ui/glass-panel';

interface RiskFactor {
  id: string;
  category: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  likelihood: 'high' | 'medium' | 'low';
  controls: string[];
}

export function RiskAssessment() {
  const riskFactors: RiskFactor[] = [
    {
      id: '1',
      category: 'Financial',
      description: 'Inadequate cash flow management',
      impact: 'high',
      likelihood: 'medium',
      controls: [
        'Weekly cash flow forecasting',
        'Credit line maintenance',
        'Regular review of receivables',
      ],
    },
    {
      id: '2',
      category: 'Compliance',
      description: 'Non-compliance with tax regulations',
      impact: 'high',
      likelihood: 'low',
      controls: [
        'Regular tax audits',
        'Professional tax consultation',
        'Updated compliance calendar',
      ],
    },
    {
      id: '3',
      category: 'Operational',
      description: 'Data security breaches',
      impact: 'high',
      likelihood: 'medium',
      controls: [
        'Regular security audits',
        'Employee training',
        'Encryption protocols',
      ],
    },
  ];

  const getRiskLevel = (impact: string, likelihood: string) => {
    if (impact === 'high' && likelihood === 'high') return 'Critical';
    if (impact === 'high' && likelihood === 'medium') return 'High';
    if (impact === 'medium' && likelihood === 'high') return 'High';
    if (impact === 'high' && likelihood === 'low') return 'Medium';
    if (impact === 'low' && likelihood === 'high') return 'Medium';
    return 'Low';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'text-red-500 bg-red-500/10';
      case 'High':
        return 'text-orange-500 bg-orange-500/10';
      case 'Medium':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-green-500 bg-green-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">2</h3>
              <p className="text-sm text-gray-400">High Risk Factors</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <Activity className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">3</h3>
              <p className="text-sm text-gray-400">Medium Risk Factors</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">8</h3>
              <p className="text-sm text-gray-400">Controls in Place</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <h2 className="text-xl font-semibold mb-6">Risk Assessment Matrix</h2>
        <div className="space-y-6">
          {riskFactors.map((risk) => (
            <div
              key={risk.id}
              className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-6 last:pb-0"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{risk.category}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getRiskColor(
                        getRiskLevel(risk.impact, risk.likelihood)
                      )}`}
                    >
                      {getRiskLevel(risk.impact, risk.likelihood)} Risk
                    </span>
                  </div>
                  <p className="text-gray-400">{risk.description}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Impact: </span>
                  <span className="font-medium capitalize">{risk.impact}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-400">Likelihood: </span>
                  <span className="font-medium capitalize">{risk.likelihood}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Control Measures:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {risk.controls.map((control, index) => (
                    <li key={index} className="text-sm text-gray-400">
                      {control}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
