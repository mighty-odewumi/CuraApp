SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 0LRPGPt77RYCXxYP6pJlSr8EeXTHhHJf5XRVo1B23FO0MnQaC0rmA7qLnJZk7tZ

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'ddce7a6b-4fd5-41ec-948f-9fdc1a74c099', '{"action":"user_confirmation_requested","actor_id":"1fbd8545-9a88-4b98-8b0c-066ff7ffd5ba","actor_name":"James","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-09 04:53:20.830088+00', ''),
	('00000000-0000-0000-0000-000000000000', '7105bd26-16fb-4974-a17d-081c726b8067', '{"action":"user_signedup","actor_id":"1fbd8545-9a88-4b98-8b0c-066ff7ffd5ba","actor_name":"James","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-09 04:54:13.355832+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b17d5ecc-ea9e-428a-a25a-3988af4c84bb', '{"action":"user_confirmation_requested","actor_id":"50118490-58ee-4d80-9b93-6d923d9bb8fb","actor_name":"James","actor_username":"waylandjace190@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-09 04:55:37.978417+00', ''),
	('00000000-0000-0000-0000-000000000000', '922fa2b7-3400-4953-8ac6-3bad44b7435b', '{"action":"user_confirmation_requested","actor_id":"45035549-22ce-40cf-b8b4-5c2a7509095c","actor_name":"James","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-09 04:58:04.309876+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d897263-9b43-4806-8b15-082ad9c9057e', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"joshuastoneage@gmail.com","user_id":"1fbd8545-9a88-4b98-8b0c-066ff7ffd5ba","user_phone":""}}', '2025-06-09 05:06:12.595281+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d07da32-a55f-4c86-aa9c-875ad6cce9cf', '{"action":"user_confirmation_requested","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-09 05:06:33.276261+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f43f395-6204-4263-9d22-0d33c1a08520', '{"action":"user_signedup","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-09 05:07:03.928634+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce4edd94-1787-4014-86a0-658852d9a4ed', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 05:07:28.189799+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c28a073b-604e-49a1-856c-e0a445cab491', '{"action":"token_refreshed","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 06:05:42.062896+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a31d7689-7ec5-4e09-8671-1a316c6a508e', '{"action":"token_revoked","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 06:05:42.063737+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2db387f-67f8-4496-b8b6-9a0a4cc5a463', '{"action":"token_refreshed","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 07:18:35.712535+00', ''),
	('00000000-0000-0000-0000-000000000000', '878b9694-c77e-46a6-99be-c285d5daf4fb', '{"action":"token_revoked","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 07:18:35.714768+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b973340-4833-4abc-8945-4b688af5558c', '{"action":"token_refreshed","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 08:17:05.03363+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a15a38f-6d8e-43cb-bd31-6c13f5326fcf', '{"action":"token_revoked","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 08:17:05.035159+00', ''),
	('00000000-0000-0000-0000-000000000000', '4aac3491-afc0-4dd7-9b6d-53a21c25b7c3', '{"action":"token_refreshed","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 09:15:08.038738+00', ''),
	('00000000-0000-0000-0000-000000000000', 'effbe088-1ddf-4aa0-9bb2-d28a5e9da4e0', '{"action":"token_revoked","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 09:15:08.041225+00', ''),
	('00000000-0000-0000-0000-000000000000', '0dfea0f3-9270-4d1e-8161-4626d0a4d1c8', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 09:58:21.763311+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b14695ce-9da3-424a-838c-7bfd8deb7535', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 10:02:59.55174+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf9de198-1648-4011-984b-1d59307f9014', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 10:07:17.474796+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2fcc378-ac37-4573-9ab3-74311dce3cfd', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 10:07:36.609604+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad9fdcb3-44e7-4f13-b9d3-fa64f5c5a4cb', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 10:32:47.5569+00', ''),
	('00000000-0000-0000-0000-000000000000', '71dad279-5add-489e-ac00-290f73752bab', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 10:33:00.576132+00', ''),
	('00000000-0000-0000-0000-000000000000', '13266260-40ef-45c4-8eca-7bedd30b1fc3', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 10:41:06.451483+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee53b31d-98c1-4e8e-b325-a48e259da4e2', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 10:41:17.78548+00', ''),
	('00000000-0000-0000-0000-000000000000', '63aadcde-c95f-448e-9b86-45c25bdc5451', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 10:43:34.786034+00', ''),
	('00000000-0000-0000-0000-000000000000', '2e1125f2-51ac-4d96-b224-3f363d533967', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 10:43:52.220325+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5bea865-13fd-42c1-b3e6-2bb67d647d02', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 10:44:00.112005+00', ''),
	('00000000-0000-0000-0000-000000000000', '190afe80-7f6e-4ad8-a3a9-1d7ccc9d8764', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 10:46:31.797771+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c0cd07d-4621-4869-9080-a954e754f0e1', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 10:52:22.456713+00', ''),
	('00000000-0000-0000-0000-000000000000', '956dfbb5-ba17-4504-b977-0131e19c12aa', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 10:52:34.544254+00', ''),
	('00000000-0000-0000-0000-000000000000', '088ca787-ae51-44f9-90e6-7786f8449855', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-09 10:53:34.299683+00', ''),
	('00000000-0000-0000-0000-000000000000', '857a63e3-9378-4e0a-9239-6dc5d9a63f16', '{"action":"user_repeated_signup","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-09 11:00:21.899932+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eec9b799-e14c-4c6b-b195-09865b80d965', '{"action":"user_repeated_signup","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-09 11:02:46.021002+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8884baa-eeb1-44da-bdbc-da6c4105bccd', '{"action":"user_confirmation_requested","actor_id":"45035549-22ce-40cf-b8b4-5c2a7509095c","actor_name":"James","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-09 11:04:45.010307+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b3783cc-843e-49de-8ede-dfb2a519a183', '{"action":"user_signedup","actor_id":"45035549-22ce-40cf-b8b4-5c2a7509095c","actor_name":"James","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-09 11:05:14.393651+00', ''),
	('00000000-0000-0000-0000-000000000000', '84b394cf-db0b-4bf8-ac8d-a7e338926a54', '{"action":"login","actor_id":"45035549-22ce-40cf-b8b4-5c2a7509095c","actor_name":"James","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-09 11:07:25.970269+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd3a8b79-316d-4a69-ade2-058927caa6bb', '{"action":"user_confirmation_requested","actor_id":"72f74d10-e81c-4115-a9a6-a219a568d172","actor_name":"Ibrahim Ojo","actor_username":"ibrahimakindele37@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-10 22:03:27.121068+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e50449a2-8b75-49c6-b30c-3f1dfa54826c', '{"action":"user_signedup","actor_id":"72f74d10-e81c-4115-a9a6-a219a568d172","actor_name":"Ibrahim Ojo","actor_username":"ibrahimakindele37@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-10 22:04:15.289733+00', ''),
	('00000000-0000-0000-0000-000000000000', '872f2b7b-ac64-4c07-98e3-1f396adaad44', '{"action":"login","actor_id":"72f74d10-e81c-4115-a9a6-a219a568d172","actor_name":"Ibrahim Ojo","actor_username":"ibrahimakindele37@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-10 22:05:59.830275+00', ''),
	('00000000-0000-0000-0000-000000000000', '8cc941a2-75db-4598-ba53-167c54e0e62c', '{"action":"logout","actor_id":"72f74d10-e81c-4115-a9a6-a219a568d172","actor_name":"Ibrahim Ojo","actor_username":"ibrahimakindele37@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-10 22:21:07.808184+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de1bb4a9-fe41-43e0-b466-94aab1aa5e31', '{"action":"login","actor_id":"72f74d10-e81c-4115-a9a6-a219a568d172","actor_name":"Ibrahim Ojo","actor_username":"ibrahimakindele37@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-10 22:23:18.418117+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f622bfe7-8af2-43de-9dd8-6b2d4f4fbad8', '{"action":"user_repeated_signup","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-10 23:34:37.388042+00', ''),
	('00000000-0000-0000-0000-000000000000', '2a7d9e3d-a0c7-40ed-9d17-9597b138bae0', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-10 23:36:51.957333+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dae8b3f2-0277-4e44-8cae-accee485b62d', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 23:07:52.228161+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4dd38a1-a5bd-480d-8600-e9942b2dfe72', '{"action":"token_refreshed","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:09:59.64539+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bfd4fa21-7383-44c3-8659-87a094f10d3c', '{"action":"token_revoked","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:09:59.656425+00', ''),
	('00000000-0000-0000-0000-000000000000', '2375bd6d-c65e-47d6-b690-bf6498a34493', '{"action":"token_refreshed","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:40:31.413339+00', ''),
	('00000000-0000-0000-0000-000000000000', '26a73e88-46a5-45bd-ac3e-fef8fb97f27e', '{"action":"token_revoked","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:40:31.416978+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d7ea866-504c-4e75-a878-561d29fd3b00', '{"action":"token_refreshed","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:38:40.198021+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6f69e79-cd95-4ba6-9eb6-532496c0857d', '{"action":"token_revoked","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:38:40.201394+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e053a3a-2562-4465-b8a5-8a868be09387', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 14:31:44.594363+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cae57756-ef05-46e2-9297-95f31f3aa85a', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 14:33:38.932336+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd6844209-f93c-41b1-a6eb-60b460c5152a', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 15:06:26.326733+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8f65b78-b1eb-45ba-84a6-7e98d1d2e6c0', '{"action":"user_repeated_signup","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 15:07:50.73245+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f7e7a87-19cd-4d6f-9663-1fc92bf99c73', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 15:11:38.164475+00', ''),
	('00000000-0000-0000-0000-000000000000', '8edd264c-3c7f-467b-9c0d-3af06579b2d1', '{"action":"user_confirmation_requested","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 17:07:07.919785+00', ''),
	('00000000-0000-0000-0000-000000000000', '8520a2e6-8281-4541-a53a-3c7a6b10e8ba', '{"action":"user_signedup","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-14 17:07:31.471297+00', ''),
	('00000000-0000-0000-0000-000000000000', '704ac106-0905-45a6-8d41-adcc546686a0', '{"action":"login","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 17:07:51.426313+00', ''),
	('00000000-0000-0000-0000-000000000000', '45b925d7-47c2-4113-9482-64a1baf323c9', '{"action":"logout","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 17:28:24.925762+00', ''),
	('00000000-0000-0000-0000-000000000000', '405958df-16d7-439c-90d3-21f5cffc1c4b', '{"action":"login","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 17:29:35.990712+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e89763e-7270-4203-b74b-850123c45cdf', '{"action":"login","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 17:34:08.419965+00', ''),
	('00000000-0000-0000-0000-000000000000', '08a9723e-46b6-4a6a-bd9e-3b59680a57a1', '{"action":"token_refreshed","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 18:35:41.334848+00', ''),
	('00000000-0000-0000-0000-000000000000', '47807d7c-a1d3-458f-907e-4150296918f3', '{"action":"token_revoked","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 18:35:41.336254+00', ''),
	('00000000-0000-0000-0000-000000000000', '834e215b-ef4e-41b8-a7b5-51aa7eca54e6', '{"action":"logout","actor_id":"730435cd-544c-4feb-af08-22094369bbd6","actor_name":"Mike","actor_username":"preyarealsht@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 18:36:34.773869+00', ''),
	('00000000-0000-0000-0000-000000000000', '9386a792-735a-4ac8-9f10-5743be6868e8', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 18:36:54.686938+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea2d4f0e-44d5-4de3-b9dd-db3a03f76d3d', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 18:37:00.793843+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8f030f0-8ff8-4569-a865-85ce0b4b27e7', '{"action":"user_repeated_signup","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 18:37:18.791575+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f19eb493-619c-43bb-9054-0c85c7710cf0', '{"action":"user_repeated_signup","actor_id":"45035549-22ce-40cf-b8b4-5c2a7509095c","actor_name":"James","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 20:15:17.712847+00', ''),
	('00000000-0000-0000-0000-000000000000', '302ddc62-e591-463d-9182-64c678710d63', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 20:17:26.713632+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ae19546-b5ae-4633-9a84-743105b4f406', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 20:18:29.895159+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd1790303-69f5-4033-8c69-5adb9d66bb9d', '{"action":"user_repeated_signup","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 20:18:54.994665+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd01262a8-151b-4380-b5b6-930d2a887f3b', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 20:20:31.482415+00', ''),
	('00000000-0000-0000-0000-000000000000', '624dcabc-fe81-471c-85b4-5124845e383d', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"odewumimighty@gmail.com","user_id":"45035549-22ce-40cf-b8b4-5c2a7509095c","user_phone":""}}', '2025-06-14 20:24:52.543319+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd969b454-8391-43c2-a114-48649ac77b3f', '{"action":"logout","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 20:29:13.203363+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af49a65d-7352-464d-860d-1ea7d0207da2', '{"action":"user_confirmation_requested","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 20:30:02.414919+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ff94acf-089c-44ad-ba90-2c00987cd546', '{"action":"user_signedup","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-14 20:30:35.668795+00', ''),
	('00000000-0000-0000-0000-000000000000', '2daa4e75-84fe-49e2-a0b4-a81a5ca0fae6', '{"action":"login","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 20:31:17.84472+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e79fadac-f702-463b-9d98-5ec31be02cd5', '{"action":"logout","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-14 21:25:23.511884+00', ''),
	('00000000-0000-0000-0000-000000000000', '774f1a91-cca1-436a-b985-07c62adced2d', '{"action":"user_repeated_signup","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 21:30:54.245258+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a02282c-f533-40fa-9bb2-e69878cc1af1', '{"action":"login","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 21:31:04.348672+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd327d32-b022-42fe-b0e4-9a81ad46dd09', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 13:16:38.182293+00', ''),
	('00000000-0000-0000-0000-000000000000', '58b097a8-1d71-4f71-af24-b8b91dc0779e', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 13:16:38.195143+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a11a8ec-b6c3-4d23-8e74-62430cd3dae1', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:15:40.751463+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd527b54a-d470-429f-b57f-16861d83249d', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:15:40.754412+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa17d901-32c4-48b4-b9e0-ba00da841bfb', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:44:51.300084+00', ''),
	('00000000-0000-0000-0000-000000000000', '2043ec87-89e1-4c7c-92c9-904865dc440d', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:44:51.306224+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3c5928d-8e21-4b65-be99-da8f97a901c9', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:56:20.209394+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c78f71f-337e-4c54-b0b6-f8e782811b3c', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:56:20.227589+00', ''),
	('00000000-0000-0000-0000-000000000000', '1966c020-e329-4b9b-9f68-baeba7766c7c', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 17:35:45.920884+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf2f749b-99fb-4033-8cfa-1d6908e056ac', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 17:35:45.928666+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d82e031-966f-482d-9af6-75937838ec4f', '{"action":"logout","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-17 17:49:28.921618+00', ''),
	('00000000-0000-0000-0000-000000000000', '6fc2b903-b7e9-425e-b81c-ce15b1b15228', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"waylandjace190@gmail.com","user_id":"50118490-58ee-4d80-9b93-6d923d9bb8fb","user_phone":""}}', '2025-06-17 22:14:21.244055+00', ''),
	('00000000-0000-0000-0000-000000000000', '0518f7c8-517e-45b4-bc51-1069752f886c', '{"action":"login","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 06:33:30.522739+00', ''),
	('00000000-0000-0000-0000-000000000000', '67a7de5e-30af-4fcc-9739-79dbcaf42b81', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:33:28.632685+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d4c3de4-372c-44dc-8eb0-998350aa7258', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:33:28.637614+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0fc5947-e868-4a80-b21e-6691512f5029', '{"action":"login","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 08:54:46.300658+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e24d7755-502a-4a92-8c00-cc8414326c4f', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 10:04:49.342991+00', ''),
	('00000000-0000-0000-0000-000000000000', '949e9200-db37-4c60-9088-ebe29cd0ffee', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 10:04:49.344436+00', ''),
	('00000000-0000-0000-0000-000000000000', '478dd19e-a83e-4a17-bbf2-9020bf1ad110', '{"action":"logout","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-18 10:05:01.765276+00', ''),
	('00000000-0000-0000-0000-000000000000', '7cb24c49-cddc-457b-af7d-113683d765c6', '{"action":"login","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 10:07:58.92776+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf936fad-c8b4-4396-af26-f57875d51a93', '{"action":"logout","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-18 10:48:42.952102+00', ''),
	('00000000-0000-0000-0000-000000000000', '980dae59-e0f3-4012-b99d-24852634bf4b', '{"action":"login","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 10:50:59.365983+00', ''),
	('00000000-0000-0000-0000-000000000000', '55876807-64be-4cd4-b136-a117d015db79', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:33:44.193519+00', ''),
	('00000000-0000-0000-0000-000000000000', '3522ab00-d77a-4589-b372-f708ef0dcc7e', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:33:44.208247+00', ''),
	('00000000-0000-0000-0000-000000000000', '6104c787-fdfb-47de-870c-c3537950c1ac', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:57:58.910224+00', ''),
	('00000000-0000-0000-0000-000000000000', '17ba6169-f462-46e1-aade-ed0f862116e3', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:57:58.912892+00', ''),
	('00000000-0000-0000-0000-000000000000', '00b4d8f2-f713-431b-bfba-99fb8145a713', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-19 15:22:20.521724+00', ''),
	('00000000-0000-0000-0000-000000000000', '940a601e-9010-4ef4-9672-021a1946aa0a', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-19 15:22:20.538931+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b09da58e-6152-407a-87fc-85785039ca20', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-21 23:26:42.435381+00', ''),
	('00000000-0000-0000-0000-000000000000', '09fd0bea-a741-439e-8117-45b2bafc536b', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-21 23:26:42.447867+00', ''),
	('00000000-0000-0000-0000-000000000000', '84698500-62cd-4928-b4bd-3eba549c96eb', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-22 18:01:45.584904+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adc57cea-4434-4f51-843e-27cc1e130bcc', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-22 18:01:45.593219+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b9b9b7a-9a45-4c02-a38d-d1fac95ed0bf', '{"action":"token_refreshed","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-25 13:26:38.065851+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce4d288d-4f38-4667-b0c5-a13f87d274c1', '{"action":"token_revoked","actor_id":"18d96a41-e3bf-424f-8e6e-8f0fdbb654dc","actor_name":"Mighty ","actor_username":"odewumimighty@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-25 13:26:38.087491+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbd11716-d631-4d46-afaa-de12bf3b0d27', '{"action":"login","actor_id":"4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2","actor_name":"Amos","actor_username":"joshuastoneage@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-23 19:03:14.522366+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '72f74d10-e81c-4115-a9a6-a219a568d172', 'authenticated', 'authenticated', 'ibrahimakindele37@gmail.com', '$2a$10$MabhTtVOiI/sn.eqG8toweMuIisjspt2aG0Dto19CqM44/JLEXX36', '2025-06-10 22:04:15.290373+00', NULL, '', '2025-06-10 22:03:27.130209+00', '', NULL, '', '', NULL, '2025-06-10 22:23:18.419754+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "72f74d10-e81c-4115-a9a6-a219a568d172", "email": "ibrahimakindele37@gmail.com", "full_name": "Ibrahim Ojo", "email_verified": true, "phone_verified": false}', NULL, '2025-06-10 22:03:27.063646+00', '2025-06-10 22:23:18.423236+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '730435cd-544c-4feb-af08-22094369bbd6', 'authenticated', 'authenticated', 'preyarealsht@gmail.com', '$2a$10$jbA8PaHE0pHsES0UqrHXpeauyU1iHpr34hiQBiHg8ndeHciJmaEoG', '2025-06-14 17:07:31.471913+00', NULL, '', '2025-06-14 17:07:07.92343+00', '', NULL, '', '', NULL, '2025-06-14 17:34:08.421465+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "730435cd-544c-4feb-af08-22094369bbd6", "email": "preyarealsht@gmail.com", "full_name": "Mike", "email_verified": true, "phone_verified": false}', NULL, '2025-06-14 17:07:07.895367+00', '2025-06-14 18:35:41.346796+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'authenticated', 'authenticated', 'odewumimighty@gmail.com', '$2a$10$.q4ei3civwKpD2UVv.SifORKf6aMteEKpHRDmeilpN8rWRRed8Acu', '2025-06-14 20:30:35.669362+00', NULL, '', '2025-06-14 20:30:02.416113+00', '', NULL, '', '', NULL, '2025-06-18 10:50:59.366893+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "18d96a41-e3bf-424f-8e6e-8f0fdbb654dc", "email": "odewumimighty@gmail.com", "full_name": "Mighty ", "email_verified": true, "phone_verified": false}', NULL, '2025-06-14 20:30:02.403447+00', '2025-06-25 13:26:38.1197+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'authenticated', 'authenticated', 'joshuastoneage@gmail.com', '$2a$10$f6rVwyPKVHQ.AS2iXBe9YeEqKRT5UDwe.9oxCO0sTpI4zBdWdBW1u', '2025-06-09 05:07:03.929249+00', NULL, '', '2025-06-09 05:06:33.276727+00', '', NULL, '', '', NULL, '2025-09-23 19:03:14.551128+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2", "email": "joshuastoneage@gmail.com", "full_name": "Amos", "email_verified": true, "phone_verified": false}', NULL, '2025-06-09 05:06:33.267081+00', '2025-09-23 19:03:14.593337+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', '{"sub": "4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2", "email": "joshuastoneage@gmail.com", "full_name": "Amos", "email_verified": true, "phone_verified": false}', 'email', '2025-06-09 05:06:33.272894+00', '2025-06-09 05:06:33.272944+00', '2025-06-09 05:06:33.272944+00', '30a9fb1c-4aee-412d-81fd-48e5caafcda3'),
	('72f74d10-e81c-4115-a9a6-a219a568d172', '72f74d10-e81c-4115-a9a6-a219a568d172', '{"sub": "72f74d10-e81c-4115-a9a6-a219a568d172", "email": "ibrahimakindele37@gmail.com", "full_name": "Ibrahim Ojo", "email_verified": true, "phone_verified": false}', 'email', '2025-06-10 22:03:27.11094+00', '2025-06-10 22:03:27.111001+00', '2025-06-10 22:03:27.111001+00', '0ca901f1-2a13-4a9b-bfbc-2472850a3a8a'),
	('730435cd-544c-4feb-af08-22094369bbd6', '730435cd-544c-4feb-af08-22094369bbd6', '{"sub": "730435cd-544c-4feb-af08-22094369bbd6", "email": "preyarealsht@gmail.com", "full_name": "Mike", "email_verified": true, "phone_verified": false}', 'email', '2025-06-14 17:07:07.913127+00', '2025-06-14 17:07:07.913193+00', '2025-06-14 17:07:07.913193+00', '7ef07fd9-5afa-453f-acd7-b802efbe42d3'),
	('18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', '{"sub": "18d96a41-e3bf-424f-8e6e-8f0fdbb654dc", "email": "odewumimighty@gmail.com", "full_name": "Mighty ", "email_verified": true, "phone_verified": false}', 'email', '2025-06-14 20:30:02.411282+00', '2025-06-14 20:30:02.411344+00', '2025-06-14 20:30:02.411344+00', 'a35fea38-ae15-4e1e-8d86-a5e51a951019');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('5eeb9771-7843-47b8-8d86-d348f0c2ef3d', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', '2025-06-18 10:50:59.366966+00', '2025-06-25 13:26:38.125174+00', NULL, 'aal1', NULL, '2025-06-25 13:26:38.12509', 'okhttp/4.9.2', '102.89.69.213', NULL),
	('35dbffc3-f2ef-4e87-b0d7-8bb1860d7f09', '72f74d10-e81c-4115-a9a6-a219a568d172', '2025-06-10 22:23:18.419843+00', '2025-06-10 22:23:18.419843+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.9.2', '102.89.68.124', NULL),
	('965fe723-d708-47b6-8d1a-8628f4eea7ca', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', '2025-09-23 19:03:14.551216+00', '2025-09-23 19:03:14.551216+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '102.89.84.212', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('35dbffc3-f2ef-4e87-b0d7-8bb1860d7f09', '2025-06-10 22:23:18.423885+00', '2025-06-10 22:23:18.423885+00', 'password', 'a60e2246-e497-4e86-8848-1bf585daa967'),
	('5eeb9771-7843-47b8-8d86-d348f0c2ef3d', '2025-06-18 10:50:59.372523+00', '2025-06-18 10:50:59.372523+00', 'password', 'e6e78a7c-7f43-40dc-92fd-08d6bf611c42'),
	('965fe723-d708-47b6-8d1a-8628f4eea7ca', '2025-09-23 19:03:14.604496+00', '2025-09-23 19:03:14.604496+00', 'password', '632ab116-a046-4ffa-9715-3571ed0fb39d');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 48, 'zzpbovobzqwz', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', true, '2025-06-18 10:50:59.370028+00', '2025-06-18 18:33:44.208833+00', NULL, '5eeb9771-7843-47b8-8d86-d348f0c2ef3d'),
	('00000000-0000-0000-0000-000000000000', 49, 'oc3vgb4yuu7s', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', true, '2025-06-18 18:33:44.220921+00', '2025-06-18 19:57:58.913403+00', 'zzpbovobzqwz', '5eeb9771-7843-47b8-8d86-d348f0c2ef3d'),
	('00000000-0000-0000-0000-000000000000', 50, 'kivrx5qjv2ut', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', true, '2025-06-18 19:57:58.916059+00', '2025-06-19 15:22:20.540177+00', 'oc3vgb4yuu7s', '5eeb9771-7843-47b8-8d86-d348f0c2ef3d'),
	('00000000-0000-0000-0000-000000000000', 51, 'seylew7d5tph', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', true, '2025-06-19 15:22:20.559556+00', '2025-06-21 23:26:42.449089+00', 'kivrx5qjv2ut', '5eeb9771-7843-47b8-8d86-d348f0c2ef3d'),
	('00000000-0000-0000-0000-000000000000', 52, '2mql7za2n5hh', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', true, '2025-06-21 23:26:42.458989+00', '2025-06-22 18:01:45.594464+00', 'seylew7d5tph', '5eeb9771-7843-47b8-8d86-d348f0c2ef3d'),
	('00000000-0000-0000-0000-000000000000', 53, 'duupatu67ndi', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', true, '2025-06-22 18:01:45.604591+00', '2025-06-25 13:26:38.089291+00', '2mql7za2n5hh', '5eeb9771-7843-47b8-8d86-d348f0c2ef3d'),
	('00000000-0000-0000-0000-000000000000', 54, 'bwawis43gaav', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', false, '2025-06-25 13:26:38.111318+00', '2025-06-25 13:26:38.111318+00', 'duupatu67ndi', '5eeb9771-7843-47b8-8d86-d348f0c2ef3d'),
	('00000000-0000-0000-0000-000000000000', 19, '7tt6a3n5egp4', '72f74d10-e81c-4115-a9a6-a219a568d172', false, '2025-06-10 22:23:18.420998+00', '2025-06-10 22:23:18.420998+00', NULL, '35dbffc3-f2ef-4e87-b0d7-8bb1860d7f09'),
	('00000000-0000-0000-0000-000000000000', 55, 'nzy7jxpavagy', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', false, '2025-09-23 19:03:14.571395+00', '2025-09-23 19:03:14.571395+00', NULL, '965fe723-d708-47b6-8d1a-8628f4eea7ca');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: portfolio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."portfolio" ("id", "user_id", "symbol", "company_name", "shares", "purchase_price", "current_price", "total_value", "profit_loss", "profit_loss_percent", "purchase_date", "created_at", "updated_at") VALUES
	('6288187b-34e3-4e22-89aa-51bf64c91f2b', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'MAYBAKER', 'MAYBAKER ', 10, 15.40, 15.40, 154.00, 0.00, 0.00, '2025-06-14 13:40:27.842+00', '2025-06-14 13:40:28.741956+00', '2025-06-14 13:40:28.741956+00'),
	('c39b3635-f8bb-4df9-a749-6f80a31562aa', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'MAYBAKER', 'MAYBAKER ', 10, 15.40, 15.40, 154.00, 0.00, 0.00, '2025-06-14 13:56:32.62+00', '2025-06-14 13:56:33.401049+00', '2025-06-14 13:56:33.401049+00'),
	('e4d35a67-f50b-4d09-b707-19ca60854fba', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'LIVINGTRUST', 'LIVINGTRUST ', 10, 5.72, 5.72, 57.20, 0.00, 0.00, '2025-06-14 13:57:31.902+00', '2025-06-14 13:57:32.758975+00', '2025-06-14 13:57:32.758975+00'),
	('3283a34a-31c3-4ebb-a739-05b2d1b84688', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'INFINITY', 'INFINITY [BLS]', 10, 7.70, 7.70, 77.00, 0.00, 0.00, '2025-06-14 15:12:40.194+00', '2025-06-14 15:12:40.91629+00', '2025-06-14 15:12:40.91629+00'),
	('98256e25-3217-472c-af2a-f00bd08a8b58', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'LIVINGTRUST', 'LIVINGTRUST ', 50, 5.72, 5.72, 286.00, 0.00, 0.00, '2025-06-14 15:12:46.058+00', '2025-06-14 15:12:46.760019+00', '2025-06-14 15:12:46.760019+00'),
	('cb551350-0732-4d1c-a847-130281703aa8', '730435cd-544c-4feb-af08-22094369bbd6', 'FIDSON', 'FIDSON ', 50, 38.40, 38.40, 1920.00, 0.00, 0.00, '2025-06-14 17:18:06.456+00', '2025-06-14 17:18:07.282414+00', '2025-06-14 17:18:07.282414+00'),
	('68652012-45de-44fe-8c46-595ffe8b8b97', '730435cd-544c-4feb-af08-22094369bbd6', 'ELLAHLAKES', 'ELLAHLAKES ', 10, 4.33, 4.33, 43.30, 0.00, 0.00, '2025-06-14 17:18:09.986+00', '2025-06-14 17:18:10.699068+00', '2025-06-14 17:18:10.699068+00'),
	('d29d8948-e632-4246-9f0f-a24d768c8c55', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'MAYBAKER', 'MAYBAKER ', 50, 15.40, 15.40, 770.00, 0.00, 0.00, '2025-06-14 20:37:13.486+00', '2025-06-14 20:37:14.205414+00', '2025-06-14 20:37:14.205414+00'),
	('498a4193-ccc3-428c-981f-433bca0daf97', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'STANBIC', 'STANBIC ', 10, 79.35, 79.35, 793.50, 0.00, 0.00, '2025-06-14 20:37:22.581+00', '2025-06-14 20:37:23.308665+00', '2025-06-14 20:37:23.308665+00'),
	('8b582d52-aa16-48ba-bc73-daaa5a203fc0', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'FTNCOCOA', 'FTNCOCOA [RST]', 50, 2.80, 2.80, 140.00, 0.00, 0.00, '2025-06-14 20:37:34.606+00', '2025-06-14 20:37:35.351668+00', '2025-06-14 20:37:35.351668+00'),
	('16146139-fd3d-4f77-8a6b-0714891ae79d', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'FTNCOCOA', 'FTNCOCOA [RST]', 50, 2.80, 2.80, 140.00, 0.00, 0.00, '2025-06-14 20:37:41.336+00', '2025-06-14 20:37:42.311366+00', '2025-06-14 20:37:42.311366+00'),
	('8a1a8cbe-509e-46bc-99df-a09e78f64c29', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'FTNCOCOA', 'FTNCOCOA [RST]', 50, 2.80, 2.80, 140.00, 0.00, 0.00, '2025-06-14 21:47:53.314+00', '2025-06-14 21:47:19.850495+00', '2025-06-14 21:47:19.850495+00'),
	('47a49cce-4388-4a73-9b91-9ab92b66e736', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'STANBIC', 'STANBIC ', 10, 79.35, 79.35, 793.50, 0.00, 0.00, '2025-06-14 21:47:58.396+00', '2025-06-14 21:47:24.990108+00', '2025-06-14 21:47:24.990108+00'),
	('86f957b7-b112-4440-8e93-508d6e0a5dab', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'MAYBAKER', 'MAYBAKER ', 10, 15.40, 15.40, 154.00, 0.00, 0.00, '2025-06-14 21:51:25.506+00', '2025-06-14 21:50:52.103697+00', '2025-06-14 21:50:52.103697+00'),
	('040e3195-7dec-4358-8f78-c7ae847f5684', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'MBENEFIT', 'MBENEFIT [MRF]', 10, 1.10, 1.10, 11.00, 0.00, 0.00, '2025-06-18 07:41:53.757+00', '2025-06-18 07:41:20.189573+00', '2025-06-18 07:41:20.189573+00'),
	('c39e3552-0350-479a-9605-86813f7da303', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'GTCO', 'GTCO ', 6, 75.65, 75.65, 453.90, 0.00, 0.00, '2025-06-18 07:49:09.257+00', '2025-06-18 07:48:35.67095+00', '2025-06-18 07:48:35.67095+00'),
	('3b549131-39da-403d-828b-d920ce4f6874', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'PRESTIGE', 'PRESTIGE [BMF]', 5, 1.05, 1.05, 5.25, 0.00, 0.00, '2025-06-18 07:52:53.546+00', '2025-06-18 07:52:19.924125+00', '2025-06-18 07:52:19.924125+00'),
	('e0a026f2-38d8-4d31-ac08-8244ab160d61', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'MBENEFIT', 'MBENEFIT [MRF]', 6, 1.10, 1.10, 6.60, 0.00, 0.00, '2025-06-18 07:54:17.086+00', '2025-06-18 07:53:43.431268+00', '2025-06-18 07:53:43.431268+00'),
	('75f2df23-8d72-49ba-89e2-8e53d1650731', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'LEGENDINT', 'LEGENDINT [BLS]', 10, 7.96, 7.96, 79.60, 0.00, 0.00, '2025-06-18 10:11:17.533+00', '2025-06-18 10:10:43.877836+00', '2025-06-18 10:10:43.877836+00'),
	('d6ace74d-d581-41fb-8d2b-3c3866d09c4a', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'DANGSUGAR', 'DANGSUGAR ', 10, 48.40, 48.40, 484.00, 0.00, 0.00, '2025-06-25 13:27:31.59+00', '2025-06-25 13:26:58.649905+00', '2025-06-25 13:26:58.649905+00'),
	('692008df-9ab9-42f6-bc29-8c3a3add0917', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'HONYFLOUR', 'HONYFLOUR ', 196, 21.30, 21.30, 4174.80, 0.00, 0.00, '2025-09-23 19:04:10.557+00', '2025-09-23 19:03:38.542421+00', '2025-09-23 19:03:38.542421+00');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."transactions" ("id", "user_id", "name", "amount", "category", "type", "icon", "description", "date", "created_at", "updated_at") VALUES
	('55c56847-8981-4c23-bc62-54d63490e5a1', '72f74d10-e81c-4115-a9a6-a219a568d172', 'Senator Design', 50000.00, 'Freelance', 'income', 'laptop', '', '2025-06-10 22:08:51.762+00', '2025-06-10 22:08:53.747498+00', '2025-06-10 22:08:53.747498+00'),
	('17685872-bcbf-4c6f-ba39-fd6bfdae5c4b', '72f74d10-e81c-4115-a9a6-a219a568d172', 'Bought PC', 20000.00, 'Bills & Utilities', 'expense', 'receipt', '', '2025-06-10 22:10:08.999+00', '2025-06-10 22:10:10.628467+00', '2025-06-10 22:10:10.628467+00'),
	('c670b0e6-23ba-4e46-9a8f-6250c93b7594', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'Salary', 20000.00, 'freelance', 'income', NULL, NULL, '2025-06-14 13:39:52.743587+00', '2025-06-14 13:39:52.743587+00', '2025-06-14 13:39:52.743587+00'),
	('4ae55f2b-eec3-460b-ae01-e3d344c37c3d', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'Ash', 12395.00, 'Freelance', 'income', 'laptop', '', '2025-06-10 23:37:35.71+00', '2025-06-10 23:37:36.905928+00', '2025-06-10 23:37:36.905928+00'),
	('dfbafe69-37d1-4043-88b3-f1e500ac38fe', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'Vgfmdk', 500.00, 'Shopping', 'expense', 'bag', '', '2025-06-09 10:53:03.759+00', '2025-06-09 10:53:04.981363+00', '2025-06-09 10:53:04.981363+00'),
	('5094dd00-02a3-484c-a415-592c19909edb', '4d20aa95-40b4-4d7e-8d2a-a1523c0d93a2', 'Bought fan today', 12330.00, 'Bills & Utilities', 'expense', 'receipt', '', '2025-06-14 15:12:06.275+00', '2025-06-14 15:12:07.153647+00', '2025-06-14 15:12:07.153647+00'),
	('31c565df-1230-48e5-88e8-17f123d5e4cc', '730435cd-544c-4feb-af08-22094369bbd6', 'Era', 45600.00, 'Salary', 'income', 'briefcase', '', '2025-06-14 17:16:45.293+00', '2025-06-14 17:16:46.126181+00', '2025-06-14 17:16:46.126181+00'),
	('fefeb9bf-3f55-4d24-8b31-3c1ad65603ba', '730435cd-544c-4feb-af08-22094369bbd6', 'Transportation', 120000.00, 'Transport', 'expense', 'car', '', '2025-06-14 17:17:40.641+00', '2025-06-14 17:17:41.423562+00', '2025-06-14 17:17:41.423562+00'),
	('ea6bbbba-05f7-4e33-b691-16af7f0e9da2', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'Sold 3 baked cakes', 100000.00, 'Business', 'income', 'storefront', '', '2025-06-10 21:37:14.711+00', '2025-06-14 21:36:41.314778+00', '2025-06-14 21:36:41.314778+00'),
	('3d8fc339-b885-4ae3-abed-85c2512b76f5', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'Bought laptop', 450000.00, 'Education', 'expense', 'school', '', '2025-06-10 21:39:24.837+00', '2025-06-14 21:38:51.155179+00', '2025-06-14 21:38:51.155179+00'),
	('51253909-6ceb-4257-8fc3-80b01543e6bb', '18d96a41-e3bf-424f-8e6e-8f0fdbb654dc', 'Freelance payment', 500000.00, 'Freelance', 'income', 'laptop', '', '2025-06-13 21:45:55.319+00', '2025-06-14 21:45:22.291636+00', '2025-06-14 21:45:22.291636+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('avatars', 'avatars', NULL, '2025-06-14 14:46:59.260544+00', '2025-06-14 14:46:59.260544+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 55, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 0LRPGPt77RYCXxYP6pJlSr8EeXTHhHJf5XRVo1B23FO0MnQaC0rmA7qLnJZk7tZ

RESET ALL;
