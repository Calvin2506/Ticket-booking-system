-- Database schema for the Travel Booking System

-- Table to store user information
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Table to store booking information
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY,
    user_id INT,
    accommodation_id INT,
    booking_date DATE,
    check_in_date DATE,
    check_out_date DATE,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Table to store accommodation information
CREATE TABLE accommodations (
    accommodation_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    rating DECIMAL(3, 1)
);

-- Table to store user authentication tokens
CREATE TABLE auth_tokens (
    user_id INT,
    token VARCHAR(100),
    expiration_date DATETIME,
    PRIMARY KEY (user_id, token),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Table to store payment information
CREATE TABLE payments (
    payment_id INT PRIMARY KEY,
    booking_id INT,
    payment_date DATE,
    amount DECIMAL(10, 2),
    payment_status VARCHAR(20),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

