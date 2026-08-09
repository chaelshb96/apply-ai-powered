-- Run this in the Supabase SQL Editor AFTER the migration table has been created.
-- Creates 10 dummy records with varied results spanning all 6 services.

---- #1 Sarah Chen → Claude Programme (primary), Mentoring (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'sara8c12-h4nd-4l0n-3cl4u-de0000000001',
  'Sarah Chen',
  'sarah@demo.com',
  '{"0":"student","1":"learn-ai","2":"solo","3":"casual","4":"under-250","5":"not-sure","6":"need-website","7":"na","8":"na","9":"structured"}'::jsonb,
  '{
    "primary":{"key":"claude","score":78,"label":"Claude Programme","shortLabel":"Claude"},
    "secondary":{"key":"mentoring","score":62,"label":"1:1 Mentoring","shortLabel":"Mentoring"},
    "allScores":[
      {"key":"claude","score":78,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"mentoring","score":62,"label":"1:1 Mentoring","shortLabel":"Mentoring"},
      {"key":"automations","score":35,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"website","score":18,"label":"Website Development","shortLabel":"Website"},
      {"key":"marketing","score":14,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"crm","score":10,"label":"CRM & Sales Workflows","shortLabel":"CRM"}
    ],
    "explanation":"You are at the right stage for structured learning. The Claude Programme will give you hands-on AI skills through a proven 6-week curriculum alongside a cohort of peers. You may also benefit from Mentoring as a complementary next step."
  }'::jsonb,
  now() - interval '3 days'
);

---- #2 James Wright → Website (primary), Marketing (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'jame8c12-h4nd-4l0n-3w3b5-de0000000002',
  'James Wright',
  'james@demo.com',
  '{"0":"founder","1":"build-website","2":"2-5","3":"daily","4":"5k-15k","5":"3-months","6":"need-website","7":"referrals","8":"spreadsheets","9":"done-for-me"}'::jsonb,
  '{
    "primary":{"key":"website","score":85,"label":"Website Development","shortLabel":"Website"},
    "secondary":{"key":"marketing","score":58,"label":"Digital Marketing","shortLabel":"Marketing"},
    "allScores":[
      {"key":"website","score":85,"label":"Website Development","shortLabel":"Website"},
      {"key":"marketing","score":58,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"crm","score":42,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"automations","score":35,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"claude","score":22,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"mentoring","score":15,"label":"1:1 Mentoring","shortLabel":"Mentoring"}
    ],
    "explanation":"Your top priority is getting a high-performing online presence. A custom website built by our agency team will give you the foundation you need to grow. You may also benefit from Marketing as a complementary next step."
  }'::jsonb,
  now() - interval '2 days'
);

---- #3 Maria Lopez → Mentoring (primary), Claude (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'mari8c12-h4nd-4l0n-3m3nt-de0000000003',
  'Maria Lopez',
  'maria@demo.com',
  '{"0":"executive","1":"need-guidance","2":"6-20","3":"daily","4":"15k-50k","5":"6-months","6":"works-well","7":"paid-ads","8":"advanced-crm","9":"partner"}'::jsonb,
  '{
    "primary":{"key":"mentoring","score":76,"label":"1:1 Mentoring","shortLabel":"Mentoring"},
    "secondary":{"key":"claude","score":55,"label":"Claude Programme","shortLabel":"Claude"},
    "allScores":[
      {"key":"mentoring","score":76,"label":"1:1 Mentoring","shortLabel":"Mentoring"},
      {"key":"claude","score":55,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"marketing","score":52,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"automations","score":48,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"crm","score":44,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"website","score":20,"label":"Website Development","shortLabel":"Website"}
    ],
    "explanation":"Your answers show you would benefit most from personalised, 1:1 guidance. Mentoring gives you direct access to expert advice tailored to your specific situation and pace. You may also benefit from Claude as a complementary next step."
  }'::jsonb,
  now() - interval '2 days'
);

---- #4 Tom Baker → Marketing (primary), CRM (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'tomb8c12-h4nd-4l0n-3m4rk-de0000000004',
  'Tom Baker',
  'tom@demo.com',
  '{"0":"manager","1":"get-customers","2":"21-50","3":"casual","4":"5k-15k","5":"this-month","6":"no-results","7":"social-media","8":"chaotic","9":"done-for-me"}'::jsonb,
  '{
    "primary":{"key":"marketing","score":82,"label":"Digital Marketing","shortLabel":"Marketing"},
    "secondary":{"key":"crm","score":65,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
    "allScores":[
      {"key":"marketing","score":82,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"crm","score":65,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"automations","score":52,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"website","score":38,"label":"Website Development","shortLabel":"Website"},
      {"key":"claude","score":28,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"mentoring","score":22,"label":"1:1 Mentoring","shortLabel":"Mentoring"}
    ],
    "explanation":"You need more customers and a systematic approach to growth. Our digital marketing team can build the infrastructure to attract and convert your ideal audience. You may also benefit from CRM as a complementary next step."
  }'::jsonb,
  now() - interval '1 day'
);

---- #5 Priya Patel → CRM (primary), Automations (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'priy8c12-h4nd-4l0n-3crm5-de0000000005',
  'Priya Patel',
  'priya@demo.com',
  '{"0":"executive","1":"grow-business","2":"6-20","3":"builder","4":"15k-50k","5":"3-months","6":"works-well","7":"email","8":"spreadsheets","9":"hybrid"}'::jsonb,
  '{
    "primary":{"key":"crm","score":80,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
    "secondary":{"key":"automations","score":70,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
    "allScores":[
      {"key":"crm","score":80,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"automations","score":70,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"marketing","score":55,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"claude","score":32,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"website","score":24,"label":"Website Development","shortLabel":"Website"},
      {"key":"mentoring","score":18,"label":"1:1 Mentoring","shortLabel":"Mentoring"}
    ],
    "explanation":"Your sales process needs structure and automation. A well-designed CRM system will transform how you manage leads, follow-ups, and customer relationships. You may also benefit from AI Automations as a complementary next step."
  }'::jsonb,
  now() - interval '1 day'
);

---- #6 Alex Kim → Automations (primary), CRM (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'alex8c12-h4nd-4l0n-3aut0-de0000000006',
  'Alex Kim',
  'alex@demo.com',
  '{"0":"ic","1":"automate","2":"2-5","3":"advanced","4":"50k-plus","5":"this-month","6":"works-well","7":"paid-ads","8":"advanced-crm","9":"done-for-me"}'::jsonb,
  '{
    "primary":{"key":"automations","score":88,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
    "secondary":{"key":"crm","score":58,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
    "allScores":[
      {"key":"automations","score":88,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"crm","score":58,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"marketing","score":52,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"website","score":30,"label":"Website Development","shortLabel":"Website"},
      {"key":"claude","score":20,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"mentoring","score":12,"label":"1:1 Mentoring","shortLabel":"Mentoring"}
    ],
    "explanation":"You are ready to eliminate busywork with custom AI workflows. Our automation builds will save you hours each week and let you focus on what matters. You may also benefit from CRM as a complementary next step."
  }'::jsonb,
  now() - interval '12 hours'
);

---- #7 Emma Davis → Claude (primary), Automations (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'emma8c12-h4nd-4l0n-3cl4u-de0000000007',
  'Emma Davis',
  'emma@demo.com',
  '{"0":"manager","1":"learn-ai","2":"2-5","3":"beginner","4":"250-1k","5":"not-sure","6":"need-redesign","7":"social-media","8":"na","9":"structured"}'::jsonb,
  '{
    "primary":{"key":"claude","score":74,"label":"Claude Programme","shortLabel":"Claude"},
    "secondary":{"key":"automations","score":55,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
    "allScores":[
      {"key":"claude","score":74,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"automations","score":55,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"mentoring","score":50,"label":"1:1 Mentoring","shortLabel":"Mentoring"},
      {"key":"website","score":38,"label":"Website Development","shortLabel":"Website"},
      {"key":"marketing","score":32,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"crm","score":15,"label":"CRM & Sales Workflows","shortLabel":"CRM"}
    ],
    "explanation":"You are at the right stage for structured learning. The Claude Programme will give you hands-on AI skills through a proven 6-week curriculum alongside a cohort of peers. You may also benefit from AI Automations as a complementary next step."
  }'::jsonb,
  now() - interval '6 hours'
);

---- #8 Ryan Taylor → Website (primary), Marketing (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'ryan8c12-h4nd-4l0n-3w3b5-de0000000008',
  'Ryan Taylor',
  'ryan@demo.com',
  '{"0":"freelancer","1":"build-website","2":"solo","3":"daily","4":"1k-5k","5":"3-months","6":"need-website","7":"referrals","8":"na","9":"done-for-me"}'::jsonb,
  '{
    "primary":{"key":"website","score":82,"label":"Website Development","shortLabel":"Website"},
    "secondary":{"key":"marketing","score":55,"label":"Digital Marketing","shortLabel":"Marketing"},
    "allScores":[
      {"key":"website","score":82,"label":"Website Development","shortLabel":"Website"},
      {"key":"marketing","score":55,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"crm","score":35,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"automations","score":30,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"claude","score":25,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"mentoring","score":18,"label":"1:1 Mentoring","shortLabel":"Mentoring"}
    ],
    "explanation":"Your top priority is getting a high-performing online presence. A custom website built by our agency team will give you the foundation you need to grow. You may also benefit from Marketing as a complementary next step."
  }'::jsonb,
  now() - interval '4 hours'
);

---- #9 Nina Okafor → Mentoring (primary), Claude (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'nina8c12-h4nd-4l0n-3m3nt-de0000000009',
  'Nina Okafor',
  'nina@demo.com',
  '{"0":"executive","1":"need-guidance","2":"50-plus","3":"casual","4":"50k-plus","5":"6-months","6":"works-well","7":"paid-ads","8":"advanced-crm","9":"partner"}'::jsonb,
  '{
    "primary":{"key":"mentoring","score":72,"label":"1:1 Mentoring","shortLabel":"Mentoring"},
    "secondary":{"key":"claude","score":48,"label":"Claude Programme","shortLabel":"Claude"},
    "allScores":[
      {"key":"mentoring","score":72,"label":"1:1 Mentoring","shortLabel":"Mentoring"},
      {"key":"claude","score":48,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"automations","score":45,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"marketing","score":40,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"crm","score":38,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"website","score":28,"label":"Website Development","shortLabel":"Website"}
    ],
    "explanation":"Your answers show you would benefit most from personalised, 1:1 guidance. Mentoring gives you direct access to expert advice tailored to your specific situation and pace. You may also benefit from Claude as a complementary next step."
  }'::jsonb,
  now() - interval '2 hours'
);

---- #10 David Park → Marketing (primary), CRM (secondary)
INSERT INTO responses (share_token, name, email, answers, scores, created_at) VALUES (
  'davi8c12-h4nd-4l0n-3m4rk-de0000000010',
  'David Park',
  'david@demo.com',
  '{"0":"founder","1":"get-customers","2":"2-5","3":"casual","4":"5k-15k","5":"this-month","6":"no-results","7":"no-system","8":"chaotic","9":"hybrid"}'::jsonb,
  '{
    "primary":{"key":"marketing","score":84,"label":"Digital Marketing","shortLabel":"Marketing"},
    "secondary":{"key":"crm","score":68,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
    "allScores":[
      {"key":"marketing","score":84,"label":"Digital Marketing","shortLabel":"Marketing"},
      {"key":"crm","score":68,"label":"CRM & Sales Workflows","shortLabel":"CRM"},
      {"key":"automations","score":45,"label":"AI Automations & Builds","shortLabel":"AI Automations"},
      {"key":"website","score":32,"label":"Website Development","shortLabel":"Website"},
      {"key":"claude","score":24,"label":"Claude Programme","shortLabel":"Claude"},
      {"key":"mentoring","score":20,"label":"1:1 Mentoring","shortLabel":"Mentoring"}
    ],
    "explanation":"You need more customers and a systematic approach to growth. Our digital marketing team can build the infrastructure to attract and convert your ideal audience. You may also benefit from CRM as a complementary next step."
  }'::jsonb,
  now()
);

---- Verify
SELECT share_token, name, scores->'primary'->>'label' AS primary_label
FROM responses
ORDER BY created_at DESC
LIMIT 10;
