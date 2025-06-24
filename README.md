# airbnb-clone-project
AirBnB  clone prroject

# goal-of-the-project
The backend for the Airbnb Clone project is designed to provide a robust and scalable foundation for managing user interactions, property listings, bookings, and payments.

# tech-stack
Some tools for this project are django, graphQL, gitaction, postgressSql.

# Team Roles

    backend-developer
        Ensures that the application has reliable business logic, handles user requests efficiently, and securely manages data communication between frontend and backend layers.
        Responsibility:
        Implements server-side application logic.
        Designs and develops RESTful or GraphQL APIs.
        Integrates third-party services (e.g., payment gateways, email services).
        Works closely with the frontend team to ensure seamless data exchange.
        Maintains clean, scalable code adhering to best practices and design patterns.

    Database Administrator (DBA)
        Provides a robust, efficient, and secure foundation for storing and retrieving application data. Collaborates closely with backend developers to optimize database access.
        Responsibility:
        Designs the database schema aligned with business requirements.
        Manages data integrity, indexing, normalization, and query optimization.
        Ensures data security, backup strategies, and disaster recovery plans.
        Monitors performance and resolves database bottlenecks.

    DevOps Engineer
        Automates deployment workflows, maintains server uptime, and ensures the application runs smoothly in various environments (staging, production, etc.).
        Responsibility:
        Sets up CI/CD pipelines for smooth deployment and integration.
        Manages infrastructure-as-code (IaC) tools like Terraform or Ansible.
        Monitors performance using tools like Prometheus, Grafana, or Datadog.
        Ensures system scalability, reliability, and high availability.
        Handles containerization and orchestration with tools like Docker and Kubernetes.

    QA Engineer
        Guarantees the backend is stable, secure, and meets the required functional and non-functional standards before release.
        Responsibility:
        Writes and runs automated and manual tests for backend logic and APIs.
        Uses tools like Postman, JUnit, or Selenium to test endpoints and functionality.
        Validates performance, security, and edge case handling.
        Collaborates with developers to resolve bugs and ensure new features don’t introduce regressions.


# Technology Stack
This project uses the following technologies to build, run, and maintain the backend system:

    Django
        A high-level Python web framework used for building robust and scalable RESTful APIs, handling core backend logic, and managing the overall application structure.

    Django REST Framework (DRF)
        An extension of Django that provides a powerful toolkit for building and managing RESTful APIs, including authentication, serialization, and request/response handling.

    PostgreSQL
        A powerful open-source relational database system used to store and manage structured data efficiently and securely.

    GraphQL
        A query language for APIs that allows clients to request exactly the data they need, improving flexibility and reducing over-fetching or under-fetching of data

    Celery
        An asynchronous task queue used to handle background tasks such as sending notifications, processing long-running jobs, or managing scheduled tasks.

    Redis
        An in-memory data structure store used for caching, session management, and as a message broker for Celery tasks to ensure fast performance.

    Docker
        A containerization tool used to package the application and its dependencies into isolated environments, ensuring consistency across development, staging, and production.

    CI/CD Pipelines
        Automated workflows for testing, building, and deploying code changes to ensure fast, reliable, and repeatable delivery to production environments.

# Database Design
   Users
Represents all users of the platform including property owners and guests.
Important Fields:

id: Unique identifier for the user.
name: Full name of the user.
email: User's email address (used for login).
role: Specifies if the user is a host or guest.
created_at: Timestamp of when the user registered.

Relationships:
A user can list multiple properties.
A user can make multiple bookings.
A user can write multiple reviews.

Properties
Represents a real estate listing available for booking.

Important Fields:
id: Unique identifier for the property.
owner_id: Foreign key to the Users table (host).
title: Name of the property.
location: Address or city of the property.
price_per_night: Cost per night.

Relationships:
A property belongs to a user (host).
A property can have many bookings.
A property can have multiple reviews.

 Bookings
Represents a reservation made by a guest for a property.

Important Fields:
id: Unique identifier for the booking.
user_id: Foreign key to the guest (User).
property_id: Foreign key to the Property.
start_date: Check-in date.
end_date: Check-out date.

Relationships:
A booking belongs to a user (guest).
A booking is linked to one property.
A booking can have one payment record.

 Reviews
Allows users to leave feedback on properties after a stay.

Important Fields:
id: Unique identifier for the review.
user_id: Foreign key to the reviewer.
property_id: Foreign key to the reviewed property.
rating: Numerical rating (e.g., 1–5).
comment: Optional text feedback.

Relationships:
A review belongs to a user.
A review is linked to one property.

Payments
Tracks payment details related to a booking.

Important Fields:
id: Unique payment record identifier.
booking_id: Foreign key to the Booking.
amount: Total payment amount.
payment_status: e.g., pending, completed, failed.
timestamp: Date and time of payment.

Relationships:
A payment belongs to one booking.
Entity Relationships Summary:
User ⇨ Property: One-to-Many
User ⇨ Booking: One-to-Many
Property ⇨ Booking: One-to-Many
Property ⇨ Review: One-to-Many
Booking ⇨ Payment: One-to-One

