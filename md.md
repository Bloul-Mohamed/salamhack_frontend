Thought for 3 seconds### CV Genius API Documentation

API documentation for CV Genius (v1.2.3)

**Base URL**: `http://api.cvgenius.stepdevs.click:8000/api`

**Authentication**: Basic Authentication

## Table of Contents

- [CV Endpoints](#cv-endpoints)
- [Pack Endpoints](#pack-endpoints)
- [Users Endpoints](#users-endpoints)


## CV Endpoints

### Analyze CV File

Extracts data from CV files (PDF, LaTeX, or Word).

- **URL**: `/cv/analyze-cv-file/`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`


**Request Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| cv_file | File | Yes | CV file to analyze (PDF, LaTeX, or Word)


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | CV data extracted successfully
| 400 | Bad request - Invalid file format or content
| 500 | Server error during file processing


---

### Analyze CV Text

Analyzes the CV text and returns structured feedback and suggestions.

- **URL**: `/cv/analyze-cv/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "cv_text": "Your CV text here"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | CV analysis completed successfully
| 400 | Bad request - Invalid input data
| 500 | Server error during CV analysis


---

### Extract CV Data From File

Extracts structured JSON data from CV files (PDF, LaTeX, or Word).

- **URL**: `/cv/extract-cv-data-from-file/`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`


**Request Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| cv_file | File | Yes | CV file to extract data from (PDF, LaTeX, or Word)


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Data extracted successfully
| 400 | Bad request - Invalid file format or content
| 500 | Server error during data extraction


---

### Extract CV Data From Text

Extracts structured JSON data from CV text.

- **URL**: `/cv/extract-cv-data/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "cv_text": "Your CV text here"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Data extracted successfully
| 400 | Bad request - Invalid input data
| 500 | Server error during data extraction


---

### Generate LaTeX CV

Generates a LaTeX CV from JSON data.

- **URL**: `/cv/generate-latex-cv/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "personal_info": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "summary": "Experienced professional...",
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Tech Corp"
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science",
      "institution": "University"
    }
  ],
  "skills": {
    "technical": "Programming, Web Development"
  }
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | LaTeX CV generated successfully
| 400 | Bad request - Invalid input data
| 500 | Server error during LaTeX generation


---

### Convert LaTeX to PDF

Converts LaTeX content to a PDF file.

- **URL**: `/cv/latex-to-pdf/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "latex_content": "\\documentclass{article}\n\\begin{document}\nHello World\n\\end{document}"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | PDF file successfully generated
| 400 | Bad request - Invalid LaTeX content
| 500 | Server error during conversion


---

### Convert LaTeX to Word

Converts LaTeX content to a Word document.

- **URL**: `/cv/latex-to-word/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "latex_content": "\\documentclass{article}\n\\begin{document}\nHello World\n\\end{document}"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Word document successfully generated
| 400 | Bad request - Invalid LaTeX content
| 500 | Server error during conversion


---

### Score CV

Analyzes and scores the CV text out of 100.

- **URL**: `/cv/score-cv/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "cv_text": "Your CV text here"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | CV scoring completed successfully
| 400 | Bad request - Invalid input data
| 500 | Server error during CV scoring


## Pack Endpoints

### Jobs

#### List All Jobs

Returns a list of all available jobs.

- **URL**: `/pack/jobs/`
- **Method**: `GET`


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | List of jobs returned successfully


---

#### Create a New Job

Creates a new job.

- **URL**: `/pack/jobs/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "name": "Software Engineer"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 201 | Job created successfully


---

#### Retrieve a Specific Job

Returns a specific job by id.

- **URL**: `/pack/jobs/{id}/`
- **Method**: `GET`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this job


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Job details returned successfully


---

#### Update a Job

Updates a specific job by id.

- **URL**: `/pack/jobs/{id}/`
- **Method**: `PUT`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this job


**Request Body**:

```json
{
  "name": "Senior Software Engineer"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Job updated successfully


---

#### Partially Update a Job

Partially updates a specific job by id.

- **URL**: `/pack/jobs/{id}/`
- **Method**: `PATCH`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this job


**Request Body**:

```json
{
  "name": "Senior Software Engineer"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Job partially updated successfully


---

#### Delete a Job

Deletes a specific job by id.

- **URL**: `/pack/jobs/{id}/`
- **Method**: `DELETE`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this job


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 204 | Job deleted successfully


### Plans

#### List All Plans

Returns a list of all available plans.

- **URL**: `/pack/plans/`
- **Method**: `GET`


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | List of plans returned successfully


---

#### Create a New Plan

Creates a new subscription plan.

- **URL**: `/pack/plans/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "name": "Basic Plan",
  "price": 9.99,
  "duration": 30,
  "description": "Basic plan with limited features"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 201 | Plan created successfully


---

#### Retrieve a Specific Plan

Returns a specific plan by id.

- **URL**: `/pack/plans/{id}/`
- **Method**: `GET`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this plan


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Plan details returned successfully


---

#### Update a Plan

Updates a specific plan by id.

- **URL**: `/pack/plans/{id}/`
- **Method**: `PUT`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this plan


**Request Body**:

```json
{
  "name": "Premium Plan",
  "price": 19.99,
  "duration": 30,
  "description": "Premium plan with all features"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Plan updated successfully


---

#### Partially Update a Plan

Partially updates a specific plan by id.

- **URL**: `/pack/plans/{id}/`
- **Method**: `PATCH`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this plan


**Request Body**:

```json
{
  "price": 24.99
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Plan partially updated successfully


---

#### Delete a Plan

Deletes a specific plan by id.

- **URL**: `/pack/plans/{id}/`
- **Method**: `DELETE`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this plan


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 204 | Plan deleted successfully


## Users Endpoints

### Client Plans

#### List All Client Plans

Returns a list of all client plan associations.

- **URL**: `/users/client-plans/`
- **Method**: `GET`


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | List of client plans returned successfully


---

#### Create a Client Plan

Associate a client with a subscription plan.

- **URL**: `/users/client-plans/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "client": 1,
  "plan": 1
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 201 | Client plan created successfully


---

#### Get Plans for a Specific Client

Get all plan subscriptions for a specific client.

- **URL**: `/users/client-plans/by_client/`
- **Method**: `GET`


**Query Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| client_id | Integer | Yes | Client ID


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | List of client plans returned successfully
| 400 | Bad request - client_id is required


---

#### Retrieve a Specific Client Plan

Get details of a specific client-plan association.

- **URL**: `/users/client-plans/{id}/`
- **Method**: `GET`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client plan


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Client plan details returned successfully


---

#### Update a Client Plan

Update a client's plan association.

- **URL**: `/users/client-plans/{id}/`
- **Method**: `PUT`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client plan


**Request Body**:

```json
{
  "client": 1,
  "plan": 2
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Client plan updated successfully


---

#### Partial Update a Client Plan

Update specific fields of a client-plan association.

- **URL**: `/users/client-plans/{id}/`
- **Method**: `PATCH`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client plan


**Request Body**:

```json
{
  "plan": 2
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Client plan partially updated successfully


---

#### Delete a Client Plan

Remove a client-plan association.

- **URL**: `/users/client-plans/{id}/`
- **Method**: `DELETE`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client plan


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 204 | Client plan deleted successfully


### Clients

#### List All Clients

Returns a list of all clients in the system.

- **URL**: `/users/clients/`
- **Method**: `GET`


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | List of clients returned successfully


---

#### Create a New Client

Create a new client with the provided information.

- **URL**: `/users/clients/`
- **Method**: `POST`
- **Content-Type**: `application/json`


**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "job": 1
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 201 | Client created successfully


---

#### Retrieve a Specific Client

Get details of a specific client by ID.

- **URL**: `/users/clients/{id}/`
- **Method**: `GET`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Client details returned successfully


---

#### Update a Client

Update all fields of an existing client.

- **URL**: `/users/clients/{id}/`
- **Method**: `PUT`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client


**Request Body**:

```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "phone": "9876543210",
  "job": 2
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Client updated successfully


---

#### Partial Update a Client

Update specific fields of an existing client.

- **URL**: `/users/clients/{id}/`
- **Method**: `PATCH`
- **Content-Type**: `application/json`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client


**Request Body**:

```json
{
  "email": "updated.email@example.com"
}
```

**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | Client partially updated successfully


---

#### Delete a Client

Remove a client from the system.

- **URL**: `/users/clients/{id}/`
- **Method**: `DELETE`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this client


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 204 | Client deleted successfully


### CVs

#### List All Saved CVs

Returns a list of all saved CV files in the system.

- **URL**: `/users/cvs/`
- **Method**: `GET`


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | List of CVs returned successfully


---

#### Save a New CV

Create a new CV record for a client.

- **URL**: `/users/cvs/`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`


**Request Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| client | Integer | Yes | Client ID
| cv | File | Yes | CV file to save


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 201 | CV saved successfully


---

#### Get CVs for a Specific Client

Get all saved CV files for a specific client.

- **URL**: `/users/cvs/by_client/`
- **Method**: `GET`


**Query Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| client_id | Integer | Yes | Client ID


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | List of client CVs returned successfully
| 400 | Bad request - client_id is required


---

#### Upload a New CV for a Client

Upload a CV file for a client and store it in S3.

- **URL**: `/users/cvs/upload_cv/`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`


**Request Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| client | Integer | Yes | Client ID
| cv | File | Yes | CV file to upload


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 201 | CV uploaded successfully
| 400 | Bad request - Client ID and CV file are required


---

#### Retrieve a Specific CV

Get details of a specific CV record by ID.

- **URL**: `/users/cvs/{id}/`
- **Method**: `GET`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this CV saved


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | CV details returned successfully


---

#### Update a CV Record

Update all fields of an existing CV record.

- **URL**: `/users/cvs/{id}/`
- **Method**: `PUT`
- **Content-Type**: `multipart/form-data`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this CV saved


**Request Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| client | Integer | Yes | Client ID
| cv | File | Yes | CV file to update


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | CV record updated successfully


---

#### Partial Update a CV Record

Update specific fields of an existing CV record.

- **URL**: `/users/cvs/{id}/`
- **Method**: `PATCH`
- **Content-Type**: `multipart/form-data`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this CV saved


**Request Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| client | Integer | Yes | Client ID
| cv | File | Yes | CV file to update


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 200 | CV record partially updated successfully


---

#### Delete a CV Record

Remove a CV record from the system.

- **URL**: `/users/cvs/{id}/`
- **Method**: `DELETE`


**Path Parameters**:

| Parameter | Type | Required | Description
|-----|-----|-----|-----
| id | Integer | Yes | A unique integer value identifying this CV saved


**Responses**:

| Status | Description
|-----|-----|-----|-----
| 204 | CV record deleted successfully