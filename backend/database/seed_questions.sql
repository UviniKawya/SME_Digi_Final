USE sme_digi_final;




/* =========================================================
   DIGITAL READINESS
   5 Dimensions
   1 Common + 2 Business-Type Questions Per Dimension
========================================================= */


/* =============================
   INFRASTRUCTURE READINESS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Readiness','ALL','Infrastructure Readiness',
'Our business has reliable internet connectivity and suitable digital devices for daily operations.',
1,1),

/* Retail */
('Readiness','Retail','Infrastructure Readiness',
'Our business has suitable digital systems for managing sales and inventory.',
0,10),

('Readiness','Retail','Infrastructure Readiness',
'Our business has reliable digital payment and customer transaction facilities.',
0,11),

/* Manufacturing */
('Readiness','Manufacturing','Infrastructure Readiness',
'Our production activities are supported by suitable computers, devices, or digital systems.',
0,10),

('Readiness','Manufacturing','Infrastructure Readiness',
'Our inventory and production records can be managed using reliable digital tools.',
0,11),

/* Services */
('Readiness','Services','Infrastructure Readiness',
'Our service delivery is supported by reliable digital communication and scheduling tools.',
0,10),

('Readiness','Services','Infrastructure Readiness',
'Our business has suitable digital systems for maintaining customer and service records.',
0,11),

/* Agriculture */
('Readiness','Agriculture','Infrastructure Readiness',
'Our business has reliable access to mobile or internet services for agricultural activities.',
0,10),

('Readiness','Agriculture','Infrastructure Readiness',
'We have access to suitable digital tools for maintaining farm, supply, or market records.',
0,11),

/* Industry */
('Readiness','Industry','Infrastructure Readiness',
'Our industrial operations have suitable digital systems for managing operational information.',
0,10),

('Readiness','Industry','Infrastructure Readiness',
'Our business has adequate digital equipment and connectivity to support industrial activities.',
0,11);



/* =============================
   FINANCIAL READINESS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Readiness','ALL','Financial Readiness',
'Our business can allocate sufficient funds for useful digital technologies and their ongoing costs.',
1,1),

/* Retail */
('Readiness','Retail','Financial Readiness',
'Our business can invest in digital sales, inventory, and payment systems when required.',
0,10),

('Readiness','Retail','Financial Readiness',
'We can manage recurring costs related to retail software, payment services, and digital platforms.',
0,11),

/* Manufacturing */
('Readiness','Manufacturing','Financial Readiness',
'Our business can allocate funds for digital production and inventory-management technologies.',
0,10),

('Readiness','Manufacturing','Financial Readiness',
'We can manage the maintenance and upgrade costs of digital systems used in production.',
0,11),

/* Services */
('Readiness','Services','Financial Readiness',
'Our business can invest in suitable digital tools for service delivery and customer management.',
0,10),

('Readiness','Services','Financial Readiness',
'We can afford recurring costs for software subscriptions and digital communication services.',
0,11),

/* Agriculture */
('Readiness','Agriculture','Financial Readiness',
'Our business can allocate funds for useful agricultural digital tools and mobile technologies.',
0,10),

('Readiness','Agriculture','Financial Readiness',
'We can manage the cost of maintaining digital services used for farming, supply, or market activities.',
0,11),

/* Industry */
('Readiness','Industry','Financial Readiness',
'Our business can invest in digital technologies that improve industrial operations.',
0,10),

('Readiness','Industry','Financial Readiness',
'We can manage the cost of maintaining and upgrading digital systems used in industrial activities.',
0,11);



/* =============================
   DIGITAL SKILLS & WORKFORCE
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Readiness','ALL','Digital Skills & Workforce',
'Employees have sufficient digital skills and receive support when new digital tools are introduced.',
1,1),

/* Retail */
('Readiness','Retail','Digital Skills & Workforce',
'Employees can confidently use digital sales, inventory, and payment systems.',
0,10),

('Readiness','Retail','Digital Skills & Workforce',
'Employees can use digital tools to support customer service and daily retail activities.',
0,11),

/* Manufacturing */
('Readiness','Manufacturing','Digital Skills & Workforce',
'Employees can use the digital tools required for production and inventory activities.',
0,10),

('Readiness','Manufacturing','Digital Skills & Workforce',
'Employees receive sufficient support when new production-related digital systems are introduced.',
0,11),

/* Services */
('Readiness','Services','Digital Skills & Workforce',
'Employees can confidently use digital tools for customer communication and service delivery.',
0,10),

('Readiness','Services','Digital Skills & Workforce',
'Employees can use scheduling, record-management, or online service tools effectively.',
0,11),

/* Agriculture */
('Readiness','Agriculture','Digital Skills & Workforce',
'Employees or workers can use mobile or digital tools relevant to agricultural activities.',
0,10),

('Readiness','Agriculture','Digital Skills & Workforce',
'Employees receive sufficient guidance when agricultural digital tools are introduced.',
0,11),

/* Industry */
('Readiness','Industry','Digital Skills & Workforce',
'Employees can confidently use digital systems required for industrial operations.',
0,10),

('Readiness','Industry','Digital Skills & Workforce',
'Employees receive suitable training when new industrial digital technologies are introduced.',
0,11);



/* =============================
   STRATEGIC READINESS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Readiness','ALL','Strategic Readiness',
'Management has clear goals for using digital technologies to support business priorities.',
1,1),

/* Retail */
('Readiness','Retail','Strategic Readiness',
'Our business has clear plans for using digital technologies to improve retail operations.',
0,10),

('Readiness','Retail','Strategic Readiness',
'Digital sales, customer, and inventory initiatives are linked to our retail business goals.',
0,11),

/* Manufacturing */
('Readiness','Manufacturing','Strategic Readiness',
'Management has clear plans for using digital technologies to improve production activities.',
0,10),

('Readiness','Manufacturing','Strategic Readiness',
'Digital investments are aligned with production, quality, and resource-management priorities.',
0,11),

/* Services */
('Readiness','Services','Strategic Readiness',
'Management has clear plans for improving service delivery through digital technologies.',
0,10),

('Readiness','Services','Strategic Readiness',
'Digital initiatives are linked to customer-service and business-development goals.',
0,11),

/* Agriculture */
('Readiness','Agriculture','Strategic Readiness',
'Our business has clear plans for using digital tools to improve agricultural activities.',
0,10),

('Readiness','Agriculture','Strategic Readiness',
'Digital initiatives are linked to production, supply, market, or customer objectives.',
0,11),

/* Industry */
('Readiness','Industry','Strategic Readiness',
'Management has a clear plan for using digital technologies to improve industrial operations.',
0,10),

('Readiness','Industry','Strategic Readiness',
'Digital investments are linked to operational efficiency and business-development objectives.',
0,11);



/* =============================
   CYBERSECURITY PREPAREDNESS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Readiness','ALL','Cybersecurity Preparedness',
'Our business uses basic cybersecurity practices such as secure passwords, access controls, backups, and software updates.',
1,1),

/* Retail */
('Readiness','Retail','Cybersecurity Preparedness',
'Customer and payment information is protected from unauthorized access.',
0,10),

('Readiness','Retail','Cybersecurity Preparedness',
'Employees follow basic security practices when using sales and payment systems.',
0,11),

/* Manufacturing */
('Readiness','Manufacturing','Cybersecurity Preparedness',
'Access to digital production and inventory information is appropriately controlled.',
0,10),

('Readiness','Manufacturing','Cybersecurity Preparedness',
'Important production and operational data is regularly backed up.',
0,11),

/* Services */
('Readiness','Services','Cybersecurity Preparedness',
'Customer and service-related information is protected from unauthorized access.',
0,10),

('Readiness','Services','Cybersecurity Preparedness',
'Employees follow suitable security practices when handling customer information digitally.',
0,11),

/* Agriculture */
('Readiness','Agriculture','Cybersecurity Preparedness',
'Important farm, supplier, customer, and financial information is securely stored.',
0,10),

('Readiness','Agriculture','Cybersecurity Preparedness',
'Mobile devices and online accounts used by the business are protected with secure access controls.',
0,11),

/* Industry */
('Readiness','Industry','Cybersecurity Preparedness',
'Access to sensitive industrial and operational information is appropriately controlled.',
0,10),

('Readiness','Industry','Cybersecurity Preparedness',
'Important industrial and business data is regularly backed up and protected.',
0,11);



/* =========================================================
   DIGITAL BARRIERS
   4 Dimensions
========================================================= */


/* =============================
   FINANCIAL BARRIERS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Barrier','ALL','Financial Barriers',
'The cost of purchasing, maintaining, or upgrading digital technologies limits our digital adoption.',
1,1),

('Barrier','Retail','Financial Barriers',
'The cost of POS, inventory, payment, or online sales systems makes digital adoption difficult.',
0,10),

('Barrier','Retail','Financial Barriers',
'Ongoing software and digital-service costs create financial pressure for our retail business.',
0,11),

('Barrier','Manufacturing','Financial Barriers',
'The cost of digital production and inventory systems limits technology adoption.',
0,10),

('Barrier','Manufacturing','Financial Barriers',
'Maintenance and upgrade costs of production-related technologies are difficult to manage.',
0,11),

('Barrier','Services','Financial Barriers',
'The cost of service-management and customer-related digital tools limits adoption.',
0,10),

('Barrier','Services','Financial Barriers',
'Recurring digital-platform and software costs are difficult for our service business to manage.',
0,11),

('Barrier','Agriculture','Financial Barriers',
'The cost of agricultural digital tools and connectivity limits adoption.',
0,10),

('Barrier','Agriculture','Financial Barriers',
'Limited financial resources make it difficult to invest in useful agricultural technologies.',
0,11),

('Barrier','Industry','Financial Barriers',
'The cost of industrial digital technologies limits our ability to adopt them.',
0,10),

('Barrier','Industry','Financial Barriers',
'Maintenance and upgrade costs make industrial digitalization financially difficult.',
0,11);



/* =============================
   TECHNICAL BARRIERS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Barrier','ALL','Technical Barriers',
'Limited technical knowledge, support, or system compatibility makes digital adoption difficult.',
1,1),

('Barrier','Retail','Technical Barriers',
'Integrating sales, inventory, payment, and customer systems is difficult.',
0,10),

('Barrier','Retail','Technical Barriers',
'Limited technical support makes it difficult to solve problems with retail digital systems.',
0,11),

('Barrier','Manufacturing','Technical Barriers',
'Integrating digital technologies with existing production processes is difficult.',
0,10),

('Barrier','Manufacturing','Technical Barriers',
'Limited technical expertise makes digital production systems difficult to maintain.',
0,11),

('Barrier','Services','Technical Barriers',
'Selecting digital tools that match our service-delivery needs is difficult.',
0,10),

('Barrier','Services','Technical Barriers',
'Technical problems with digital service platforms can interrupt service delivery.',
0,11),

('Barrier','Agriculture','Technical Barriers',
'Limited connectivity and technical support make agricultural digital tools difficult to use.',
0,10),

('Barrier','Agriculture','Technical Barriers',
'Some digital technologies are difficult to integrate with existing agricultural practices.',
0,11),

('Barrier','Industry','Technical Barriers',
'Integrating new digital technologies with existing industrial systems is difficult.',
0,10),

('Barrier','Industry','Technical Barriers',
'Limited technical expertise creates difficulties in maintaining industrial digital systems.',
0,11);



/* =============================
   ORGANIZATIONAL BARRIERS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Barrier','ALL','Organizational Barriers',
'Resistance to change, limited employee skills, or weak management support restricts digital adoption.',
1,1),

('Barrier','Retail','Organizational Barriers',
'Employees are sometimes reluctant to change established retail work practices.',
0,10),

('Barrier','Retail','Organizational Barriers',
'Limited employee training makes it difficult to introduce new retail digital tools.',
0,11),

('Barrier','Manufacturing','Organizational Barriers',
'Employees may resist changes to established production processes when digital systems are introduced.',
0,10),

('Barrier','Manufacturing','Organizational Barriers',
'Limited digital skills among production employees make technology adoption difficult.',
0,11),

('Barrier','Services','Organizational Barriers',
'Employees may resist changes to traditional service-delivery methods.',
0,10),

('Barrier','Services','Organizational Barriers',
'Limited staff training makes new digital service technologies difficult to implement.',
0,11),

('Barrier','Agriculture','Organizational Barriers',
'Workers may have limited experience using digital technologies in agricultural activities.',
0,10),

('Barrier','Agriculture','Organizational Barriers',
'Traditional working practices can make the adoption of new agricultural technologies difficult.',
0,11),

('Barrier','Industry','Organizational Barriers',
'Resistance to changes in established industrial processes limits digital adoption.',
0,10),

('Barrier','Industry','Organizational Barriers',
'Limited employee digital skills make industrial technology adoption difficult.',
0,11);



/* =============================
   ENVIRONMENTAL BARRIERS
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Barrier','ALL','Environmental Barriers',
'Limited external infrastructure, government support, supplier support, or service-provider availability restricts digital adoption.',
1,1),

('Barrier','Retail','Environmental Barriers',
'Limited support from suppliers or digital service providers affects our retail digitalization.',
0,10),

('Barrier','Retail','Environmental Barriers',
'External infrastructure or service limitations make some digital retail activities difficult.',
0,11),

('Barrier','Manufacturing','Environmental Barriers',
'Limited digital capability among suppliers affects our ability to digitalize manufacturing activities.',
0,10),

('Barrier','Manufacturing','Environmental Barriers',
'External infrastructure or service limitations restrict the use of digital manufacturing technologies.',
0,11),

('Barrier','Services','Environmental Barriers',
'Limited external digital-service support affects our ability to improve service delivery.',
0,10),

('Barrier','Services','Environmental Barriers',
'Customer or partner limitations in using digital channels restrict digital service adoption.',
0,11),

('Barrier','Agriculture','Environmental Barriers',
'Poor connectivity or limited digital infrastructure in some areas restricts technology use.',
0,10),

('Barrier','Agriculture','Environmental Barriers',
'Limited external support and access to suitable digital services restrict agricultural digitalization.',
0,11),

('Barrier','Industry','Environmental Barriers',
'Limited support from suppliers and technology providers affects industrial digitalization.',
0,10),

('Barrier','Industry','Environmental Barriers',
'External infrastructure limitations restrict the effective use of industrial digital technologies.',
0,11);



/* =========================================================
   BUSINESS PERFORMANCE
   3 Dimensions
========================================================= */


/* =============================
   REVENUE & GROWTH
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Performance','ALL','Revenue & Growth',
'Digital technologies have contributed to business growth or new revenue opportunities.',
1,1),

('Performance','Retail','Revenue & Growth',
'Digital sales and payment channels have helped increase our sales opportunities.',
0,10),

('Performance','Retail','Revenue & Growth',
'Digital tools help us identify products and customer needs that support business growth.',
0,11),

('Performance','Manufacturing','Revenue & Growth',
'Digital technologies have helped improve production capacity or business growth opportunities.',
0,10),

('Performance','Manufacturing','Revenue & Growth',
'Digital tools help us respond more effectively to market demand.',
0,11),

('Performance','Services','Revenue & Growth',
'Digital service channels have helped us reach more customers.',
0,10),

('Performance','Services','Revenue & Growth',
'Digital technologies have created new opportunities for service-related revenue.',
0,11),

('Performance','Agriculture','Revenue & Growth',
'Digital tools help us access markets, pricing information, or customers more effectively.',
0,10),

('Performance','Agriculture','Revenue & Growth',
'Digital technologies have helped create better sales or market opportunities for our business.',
0,11),

('Performance','Industry','Revenue & Growth',
'Digital technologies have contributed to new market or revenue opportunities for our industrial business.',
0,10),

('Performance','Industry','Revenue & Growth',
'Digital systems help us respond more effectively to customer and market demand.',
0,11);



/* =============================
   CUSTOMER PERFORMANCE
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Performance','ALL','Customer Performance',
'Digital technologies have improved customer satisfaction, communication, or engagement.',
1,1),

('Performance','Retail','Customer Performance',
'Digital tools help us respond more quickly to customer inquiries and purchasing needs.',
0,10),

('Performance','Retail','Customer Performance',
'Digital systems help us understand customer purchasing patterns and preferences.',
0,11),

('Performance','Manufacturing','Customer Performance',
'Digital systems help us provide customers with more accurate information about orders or products.',
0,10),

('Performance','Manufacturing','Customer Performance',
'Digital communication tools have improved coordination with customers.',
0,11),

('Performance','Services','Customer Performance',
'Digital communication tools have improved our response time to customers.',
0,10),

('Performance','Services','Customer Performance',
'Digital service systems have improved customer convenience and service quality.',
0,11),

('Performance','Agriculture','Customer Performance',
'Digital communication helps us maintain better contact with buyers or customers.',
0,10),

('Performance','Agriculture','Customer Performance',
'Digital market information helps us respond better to customer or buyer requirements.',
0,11),

('Performance','Industry','Customer Performance',
'Digital communication tools have improved coordination with industrial customers.',
0,10),

('Performance','Industry','Customer Performance',
'Digital systems help us provide more timely and accurate information to customers.',
0,11);



/* =============================
   OPERATIONAL EFFICIENCY
============================= */

INSERT INTO assessment_questions
(assessment_type,business_type,dimension,question_text,is_common,display_order)
VALUES

('Performance','ALL','Operational Efficiency',
'Digital technologies have improved productivity, accuracy, or operational efficiency in our business.',
1,1),

('Performance','Retail','Operational Efficiency',
'Digital inventory and sales systems reduce manual work in daily retail operations.',
0,10),

('Performance','Retail','Operational Efficiency',
'Digital tools help us manage stock and transactions more accurately.',
0,11),

('Performance','Manufacturing','Operational Efficiency',
'Digital tools help us improve production planning and resource utilization.',
0,10),

('Performance','Manufacturing','Operational Efficiency',
'Digital systems reduce manual work and improve accuracy in production or inventory activities.',
0,11),

('Performance','Services','Operational Efficiency',
'Digital tools help us schedule and deliver services more efficiently.',
0,10),

('Performance','Services','Operational Efficiency',
'Digital records reduce manual administrative work in our service operations.',
0,11),

('Performance','Agriculture','Operational Efficiency',
'Digital tools help us manage agricultural records and activities more efficiently.',
0,10),

('Performance','Agriculture','Operational Efficiency',
'Digital information helps us make faster operational decisions related to farming, supply, or markets.',
0,11),

('Performance','Industry','Operational Efficiency',
'Digital systems help improve operational planning and resource utilization.',
0,10),

('Performance','Industry','Operational Efficiency',
'Digital technologies reduce manual work and improve accuracy in industrial operations.',
0,11);