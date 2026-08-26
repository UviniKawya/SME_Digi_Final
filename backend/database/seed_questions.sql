USE sme_digi_final;
DELETE FROM assessment_questions;

INSERT INTO assessment_questions (assessment_type,business_type,dimension,question_text,is_common,display_order) VALUES
('Readiness','ALL','Infrastructure Readiness','Our business has reliable internet connectivity for daily operations.',1,1),
('Readiness','ALL','Infrastructure Readiness','Our hardware and digital systems are adequate for current business needs.',1,2),
('Readiness','ALL','Financial Readiness','Our business can allocate funds for useful digital technologies.',1,1),
('Readiness','ALL','Financial Readiness','We can manage ongoing digital costs such as subscriptions and maintenance.',1,2),
('Readiness','ALL','Digital Skills & Workforce','Employees can confidently use the main digital tools required for their work.',1,1),
('Readiness','ALL','Digital Skills & Workforce','Employees receive support or training when new digital tools are introduced.',1,2),
('Readiness','ALL','Strategic Readiness','Management has clear goals for using digital technologies in the business.',1,1),
('Readiness','ALL','Strategic Readiness','Digital investments are linked to business priorities.',1,2),
('Readiness','ALL','Cybersecurity Preparedness','The business uses secure passwords, access controls, and regular backups.',1,1),
('Readiness','ALL','Cybersecurity Preparedness','Employees understand basic cybersecurity practices.',1,2),
('Readiness','Retail','Infrastructure Readiness','Our POS, inventory, and customer transaction systems are reliable for daily retail operations.',0,10),
('Readiness','Manufacturing','Infrastructure Readiness','Our production and inventory processes are supported by suitable digital systems.',0,10),
('Readiness','Services','Infrastructure Readiness','Our service delivery and customer communication are supported by suitable digital tools.',0,10),
('Readiness','Agriculture','Infrastructure Readiness','Our business has access to digital tools useful for farm, supply, or market activities.',0,10),

('Barrier','ALL','Financial Barriers','The cost of purchasing or maintaining digital technologies limits adoption.',1,1),
('Barrier','ALL','Technical Barriers','Limited technical support makes digital adoption difficult.',1,1),
('Barrier','ALL','Organizational Barriers','Resistance to changing existing work practices limits digital adoption.',1,1),
('Barrier','ALL','Environmental Barriers','Limited external support or infrastructure makes digital adoption difficult.',1,1),
('Barrier','Retail','Technical Barriers','Integrating sales, stock, and payment systems is difficult for our retail business.',0,10),
('Barrier','Manufacturing','Technical Barriers','Integrating digital tools with production processes is difficult.',0,10),
('Barrier','Services','Technical Barriers','Selecting suitable digital service-delivery tools is difficult.',0,10),
('Barrier','Agriculture','Environmental Barriers','Connectivity and access to digital services are difficult in some operating areas.',0,10),

('Performance','ALL','Revenue & Growth','Digital technologies have contributed to business growth or revenue opportunities.',1,1),
('Performance','ALL','Customer Performance','Digital technologies have improved customer satisfaction or engagement.',1,1),
('Performance','ALL','Operational Efficiency','Digital technologies have improved productivity and operational efficiency.',1,1),
('Performance','Retail','Customer Performance','Digital tools help us respond better to retail customer needs and purchasing patterns.',0,10),
('Performance','Manufacturing','Operational Efficiency','Digital tools help us improve production planning and resource use.',0,10),
('Performance','Services','Customer Performance','Digital tools help us deliver services more efficiently to customers.',0,10),
('Performance','Agriculture','Revenue & Growth','Digital tools help us access markets, pricing information, or customers more effectively.',0,10);
