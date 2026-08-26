USE sme_digi_final;
DELETE FROM recommendation_rules;

INSERT INTO recommendation_rules (business_type,assessment_type,dimension,classification,priority_area,recommendation_text,priority) VALUES
('ALL','Readiness','Infrastructure Readiness','Low','Digital Infrastructure','Prioritize reliable connectivity, essential hardware, and simple digital systems before adopting more advanced tools.',1),
('ALL','Readiness','Financial Readiness','Low','Digital Investment Planning','Create a small phased digital budget and prioritize low-cost tools with clear operational value.',2),
('ALL','Readiness','Digital Skills & Workforce','Low','Digital Skills','Provide short practical training focused on the digital tools employees use in daily work.',2),
('ALL','Readiness','Strategic Readiness','Low','Digital Strategy','Define two or three measurable digital goals linked directly to business priorities.',2),
('ALL','Readiness','Cybersecurity Preparedness','Low','Cybersecurity','Introduce strong passwords, access control, backups, software updates, and basic staff awareness.',1),
('ALL','Barrier','Financial Barriers','High','Financial Support','Adopt digital tools in phases and investigate suitable grants, loans, or low-cost subscription options.',1),
('ALL','Barrier','Technical Barriers','High','Technical Support','Use simpler supported technologies and obtain reliable IT assistance for setup and maintenance.',1),
('ALL','Barrier','Organizational Barriers','High','Change Management','Introduce digital changes gradually, explain benefits to employees, and provide clear responsibilities and training.',2),
('ALL','Barrier','Environmental Barriers','High','External Support','Identify government, industry, supplier, or service-provider support that can reduce external adoption constraints.',2),
('ALL','Performance','Revenue & Growth','Low','Growth Improvement','Review how digital channels, customer data, and online promotion can support sales and market reach.',2),
('ALL','Performance','Customer Performance','Low','Customer Experience','Use simple digital communication and customer-record tools to improve response time and follow-up.',2),
('ALL','Performance','Operational Efficiency','Low','Process Improvement','Identify repetitive manual activities that can be simplified through basic digital tools.',2),
('Retail','Readiness','Infrastructure Readiness','Low','Retail Systems','Start with a reliable POS and inventory system and connect digital payments where suitable.',1),
('Manufacturing','Readiness','Infrastructure Readiness','Low','Production Digitalization','Prioritize basic digital production records, inventory control, and maintenance tracking.',1),
('Services','Readiness','Infrastructure Readiness','Low','Service Digitalization','Use suitable scheduling, customer communication, and digital record tools for service delivery.',1),
('Agriculture','Readiness','Infrastructure Readiness','Low','Agriculture Digital Tools','Prioritize reliable mobile connectivity and simple digital tools for records, markets, and supply information.',1),
('ALL','Readiness','Strategic Readiness','Moderate','Digital Planning','Turn current digital activities into a simple documented plan with responsibilities, priorities, and review dates.',3);
