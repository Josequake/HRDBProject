-- Creacion de la base de datos
CREATE DATABASE Reservation_System_DB;
-- Borrado de la base de datos
DROP DATABASE Reservation_System_DB;
-- Uso de la base de datos
USE Reservation_System_DB;

-- Tablas

CREATE TABLE Administrators (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,  
    admin_name VARCHAR(50) NOT NULL,           
    admin_last_name VARCHAR(50) NOT NULL,     
    admin_password VARCHAR(255) NOT NULL,     
    admin_email VARCHAR(100) NOT NULL UNIQUE,      
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,  
    client_name VARCHAR(50) NOT NULL,           
    client_last_name VARCHAR(50) NOT NULL,     
    email VARCHAR(100) NOT NULL UNIQUE,      
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Hotels (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY, 
    hotel_name VARCHAR(100) NOT NULL,             
    address VARCHAR(255) NOT NULL,          
    city VARCHAR(100) NOT NULL,             
    state VARCHAR(100) NOT NULL,            
    zip_code VARCHAR(20) NOT NULL,         
    country VARCHAR(100) NOT NULL,          
    phone_number VARCHAR(20),               
    description TEXT,                       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY, 
    hotel_id INT NOT NULL,                  
    room_type ENUM('Single', 'Double', 'Suite') NOT NULL, 
    price DECIMAL(10, 2) NOT NULL,         
    capacity INT NOT NULL,                 
    description TEXT,                      
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id) 
);

CREATE TABLE Room_availability (
    availability_id INT AUTO_INCREMENT PRIMARY KEY, 
    room_id INT NOT NULL,                          
    start_date DATE NOT NULL,                      
    end_date DATE NOT NULL,                        
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id) 
);

CREATE TABLE Reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY, 
    client_id INT NOT NULL,                     	   
    room_id INT NOT NULL,                     
    check_in DATE NOT NULL,                   
    check_out DATE NOT NULL,                  
    total_price DECIMAL(10, 2) NOT NULL,     
    status ENUM('Pending', 'Confirmed', 'Cancelled') NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (client_id) REFERENCES Clients(client_id), 
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id)  
);

CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY, 
    reservation_id INT NOT NULL,               
    amount DECIMAL(10, 2) NOT NULL,            
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    payment_method ENUM('Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer') NOT NULL, 
    FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id) 
);

CREATE TABLE Reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY, 
    admin_id INT NOT NULL,
    client_id INT NOT NULL,                    
    report_type ENUM('Occupancy', 'Revenue') NOT NULL, 
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    content TEXT,   
    FOREIGN KEY (admin_id) REFERENCES Administrators(admin_id),
    FOREIGN KEY (client_id) REFERENCES Clients(client_id) 
);

-- Llenado de tablas
INSERT INTO Administrators (admin_name, admin_last_name, admin_password, admin_email) VALUES
('Andres', 'Smith', 'as_1234', 'asmith@rsdb.com'),
('Bryan', 'Addams', 'ba_1234', 'baddams@rsdb.com'),
('John', 'Velvet', 'jv_1234', 'jvelvet@rsdb.com'),
('Diego', 'Martinez', 'dm_1234', 'dmartinez@rsdb.com'),
('Orlando', 'Johnson', 'oj_1234', 'ojohnson@rsdb.com');


-- Ingreso de clientes
INSERT INTO Clients (client_name, client_last_name, email) VALUES
('Jose', 'Castillo', 'jcastillo@yahoo.com'),
('Joshua', 'Brenes', 'jbrenes@gmail.com'),
('Juan', 'Rodriguez', 'jrodriguez@outlook.com'),
('Dennis', 'Martinez', 'dmartinez@yahoo.com'),
('Fabio', 'Lopez', 'flopez@gmail.com'),
('Leo', 'Perez', 'lperez@hotmail.com'),
('Jonathan', 'Garcia', 'jgarcia@outlook.com'),
('Carlos', 'Morales', 'cmorales@gmail.com'),
('Abel', 'Rojas', 'arojas@hotmail.com'),
('Denilson', 'Valverde', 'dvalverde@yahoo.com');

-- Ingreso de hoteles
INSERT INTO Hotels (hotel_name, address, city, state, zip_code, country, phone_number, description) VALUES
('Hotel Arenal Springs', 'San Carlos', 'La Fortuna', 'Alajuela', '21007', 'Costa Rica', '+506 2479 8000', 'Hotel con vistas al volcán Arenal y aguas termales.'),
('Hotel San José Downtown', 'Avenida Central', 'San José', 'San José', '10101', 'Costa Rica', '+506 2256 1234', 'Ubicado en el corazón de la capital, ideal para explorar la ciudad.'),
('Hotel Tamarindo Diria', 'Playa Tamarindo', 'Tamarindo', 'Guanacaste', '50309', 'Costa Rica', '+506 2653 0019', 'Hotel frente al mar con acceso directo a la playa de Tamarindo.'),
('Hotel Monteverde Lodge', 'Ruta 606', 'Monteverde', 'Puntarenas', '60109', 'Costa Rica', '+506 2645 7004', 'Ubicado en la selva nublada de Monteverde, ofrece tours guiados por la naturaleza.'),
('Hotel Jaco Beach', 'Avenida Pastor Díaz', 'Jaco', 'Puntarenas', '61101', 'Costa Rica', '+506 2643 0030', 'Hotel frente a la playa en Jaco, conocido por su vida nocturna y deportes acuáticos.'),
('Hotel Quepos Marina', 'Quepos', 'Quepos', 'Puntarenas', '60601', 'Costa Rica', '+506 2777 0777', 'Hotel con vistas al puerto deportivo y fácil acceso a actividades de pesca y aventuras.'),
('Hotel Manuel Antonio', 'Manuel Antonio', 'Quepos', 'Puntarenas', '60601', 'Costa Rica', '+506 2777 1234', 'Hotel cerca del Parque Nacional Manuel Antonio, ideal para ecoturismo.'),
('Hotel Puerto Viejo', 'Puerto Viejo de Talamanca', 'Puerto Viejo', 'Limón', '70403', 'Costa Rica', '+506 2750 0050', 'Hotel en la costa caribeña con acceso a playas exóticas y cultura afrocaribeña.'),
('Hotel Alajuela Centro', 'Alajuela Centro', 'Alajuela', 'Alajuela', '20101', 'Costa Rica', '+506 2441 3333', 'Hotel en el centro de Alajuela, cerca del aeropuerto internacional Juan Santamaría.'),
('Hotel Golfito', 'Golfito', 'Golfito', 'Puntarenas', '60501', 'Costa Rica', '+506 2775 0101', 'Hotel en la región sur de Costa Rica, ideal para explorar la zona sur y la Península de Osa.');

-- Ingreso de habitaciones
INSERT INTO Rooms (room_id, hotel_id, room_type, price, capacity) VALUES
(1, 1, 'Single', 35000, 1), 
(2, 1, 'Double', 55000, 2), 
(3, 1, 'Suite', 95000, 4),   
(4, 2, 'Single', 32000, 1), 
(5, 2, 'Double', 52000, 2), 
(6, 2, 'Suite', 90000, 4),   
(7, 3, 'Single', 37000, 1), 
(8, 3, 'Double', 58000, 2), 
(9, 3, 'Suite', 98000, 4),   
(10, 4, 'Single', 30000, 1);

-- Disponibilidad de habitaciones
INSERT INTO Room_availability (room_id, start_date, end_date) VALUES
(1, '2024-07-01', '2024-12-31'),
(2, '2024-08-01', '2024-11-30'),
(3, '2024-07-15', '2024-10-15'),
(4, '2024-06-01', '2024-08-31'),
(5, '2024-08-10', '2024-10-10'),
(6, '2024-09-01', '2024-12-01'),
(7, '2024-08-20', '2024-11-15'),
(8, '2024-09-01', '2024-11-30'),
(9, '2024-09-01', '2024-10-15'),
(10, '2024-07-01', '2024-09-30');

-- Reservas
INSERT INTO Reservations (client_id, room_id, check_in, check_out, total_price, status) VALUES
(1, 1, '2024-08-05', '2024-08-15', 350000, 'Confirmed'),
(2, 2, '2024-09-10', '2024-09-20', 550000, 'Pending'),
(3, 3, '2024-07-20', '2024-08-05', 1520000, 'Confirmed'),
(4, 4, '2024-07-01', '2024-07-15', 448000, 'Cancelled'),
(5, 5, '2024-08-20', '2024-08-30', 520000, 'Confirmed'),
(6, 6, '2024-10-01', '2024-10-10', 810000, 'Confirmed'),
(7, 7, '2024-09-01', '2024-09-15', 518000, 'Pending'),
(8, 8, '2024-09-15', '2024-09-25', 580000, 'Confirmed'),
(9, 9, '2024-10-01', '2024-10-10', 882000, 'Confirmed'),
(10, 10, '2024-08-25', '2024-09-05', 330000, 'Pending');

-- Pagos
INSERT INTO Payments (reservation_id, amount, payment_method) VALUES
(1, 350000.00, 'Credit Card'),     
(2, 0.00, 'PayPal'),                
(3, 1520000.00, 'Credit Card'),    
(4, 0.00, 'Bank Transfer'),         
(5, 520000.00, 'Debit Card'),       
(6, 810000.00, 'Credit Card'),      
(7, 0.00, 'PayPal'),                
(8, 580000.00, 'Bank Transfer'),    
(9, 882000.00, 'Credit Card'),      
(10, 0.00, 'Debit Card');           

-- Reportes
INSERT INTO Reports (report_id, admin_id, client_id, report_type, content) VALUES
(1, 1, 3, 'Occupancy', 'Reporte de ocupación: 85% de ocupación en septiembre 2024.'),
(2, 2, 5, 'Revenue', 'Reporte de ingresos: ¢2,168,000 en reservas para septiembre 2024.'),
(3, 4, 8, 'Occupancy', 'Reporte de ocupación: 70% de ocupación en septiembre 2024.'),
(4, 5, 6, 'Revenue', 'Reporte de ingresos: ¢1,692,000 en reservas para octubre 2024.'),
(5, 2, 3, 'Occupancy', 'Reporte de ocupación: 80% de ocupación en octubre 2024.'),
(6, 1, 5, 'Revenue', 'Reporte de ingresos: ¢0 en reservas para noviembre 2024.'),
(7, 3, 8, 'Occupancy', 'Reporte de ocupación: 0% de ocupación en octubre 2024.'),
(8, 5, 6, 'Revenue', 'Reporte de ingresos: ¢0 en reservas para noviembre 2024.'),
(9, 2, 3, 'Occupancy', 'Reporte de ocupación: 0% de ocupación en noviembre 2024.'),
(10, 5, 5, 'Revenue', 'Reporte de ingresos: ¢0 en reservas para noviembre 2024.');




-- Stored Procedures
-- SP 1
DELIMITER //

CREATE PROCEDURE AddReservation(
    IN p_client_id INT,             -- Identificador del usuario que hace la reserva
    IN p_room_id INT,             -- Identificador de la habitación a reservar
    IN p_check_in DATE,           -- Fecha de llegada
    IN p_check_out DATE,          -- Fecha de salida
    IN p_total_price DECIMAL(10, 2)  -- Precio total de la reserva
)
BEGIN
    
    DECLARE v_room_capacity INT;
    DECLARE v_room_available BOOLEAN;
	
    SET v_room_available = FALSE;

	SELECT capacity INTO v_room_capacity
    FROM Rooms
    WHERE room_id = p_room_id;

    IF (SELECT COUNT(*) FROM room_availability
        WHERE room_id = p_room_id
        AND (start_date <= p_check_out AND end_date >= p_check_in)) > 0 THEN
        
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La habitación no está disponible en las fechas seleccionadas.';
    ELSE
        
        INSERT INTO Reservations (user_id, room_id, check_in, check_out, total_price, status, reservation_date)
        VALUES (p_user_id, p_room_id, p_check_in, p_check_out, p_total_price, 'Confirmed', CURDATE());

        INSERT INTO room_availability (room_id, start_date, end_date)
        VALUES (p_room_id, p_check_in, p_check_out);

        SELECT 'Reserva añadida correctamente' AS message;
    END IF;
END //

DELIMITER ;

-- SP 2
DELIMITER //

CREATE PROCEDURE CheckAvailability (
    IN p_hotel_id INT,       
    IN p_start_date DATE,    
    IN p_end_date DATE       
)
BEGIN
    
    DECLARE v_room_count INT;

    SELECT r.room_id, r.room_type, r.price, r.capacity
    FROM rooms r
    LEFT JOIN room_availability ra
    ON r.room_id = ra.room_id
    AND ra.start_date <= p_end_date
    AND ra.end_date >= p_start_date
    WHERE r.hotel_id = p_hotel_id
    AND (ra.availability_id IS NULL OR (ra.start_date > p_end_date OR ra.end_date < p_start_date))
    GROUP BY r.room_id, r.room_type, r.price, r.capacity;
    
    SELECT 'Consulta realizada con éxito' AS message;
END //

DELIMITER ;

-- SP 3
DELIMITER //

CREATE PROCEDURE CalculateOccupation (
    IN p_hotel_id INT,        
    IN p_start_date DATE,     
    IN p_end_date DATE        
)
BEGIN
    
    DECLARE v_total_rooms INT;
    DECLARE v_reserved_rooms INT;
    DECLARE v_occupied_percentage DECIMAL(5, 2);
    
    SELECT COUNT(*) INTO v_total_rooms
    FROM rooms
    WHERE hotel_id = p_hotel_id;
    
    SELECT COUNT(DISTINCT b.room_id) INTO v_reserved_rooms
    FROM reservations b
    JOIN rooms r ON b.room_id = r.room_id
    WHERE r.hotel_id = p_hotel_id
    AND b.check_in <= p_end_date
    AND b.check_out >= p_start_date
    AND b.status = 'Confirmed';

    IF v_total_rooms > 0 THEN
        SET v_occupied_percentage = (v_reserved_rooms / v_total_rooms) * 100;
    ELSE
        SET v_occupied_percentage = 0; 
    END IF;

    SELECT v_total_rooms AS total_rooms,
           v_reserved_rooms AS reserved_rooms,
           v_occupied_percentage AS occupied_percentage;

END //

DELIMITER ;

-- SP 4
DELIMITER //

CREATE PROCEDURE CancelReservation(
    IN p_reservation_id INT   
)
BEGIN
   
    DECLARE v_room_id INT;
    DECLARE v_check_in DATE;
    DECLARE v_check_out DATE;
    
    SELECT room_id, check_in, check_out INTO v_room_id, v_check_in, v_check_out
    FROM Reservations
    WHERE reservation_id = p_reservation_id
    AND status = 'Confirmed';
    
    IF v_room_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La reserva no existe o ya ha sido cancelada.';
    ELSE
        
        UPDATE Reservations
        SET status = 'Cancelled'
        WHERE reservation_id = p_reservation_id;
        
        
        INSERT INTO room_availability (room_id, start_date, end_date)
        VALUES (v_room_id, v_check_in, v_check_out);

        
        SELECT 'Reserva cancelada correctamente' AS message;
    END IF;
END //

DELIMITER ;

-- Vista 
-- Crear una vista que muestre un reporte de las reservas realizadas en el día actual.
CREATE VIEW CurrentDayReservationReport AS
SELECT 
    r.reservation_id,                            
    r.client_id,                                   
    r.room_id,                                   
    rm.room_type,                                
    h.hotel_name,                                
    r.check_in,                                  
    r.check_out,                                 -
    r.total_price,                              
    r.status,                                    
    r.created_at                                 
FROM 
    Reservations r                              
JOIN 
    rooms rm ON r.room_id = rm.room_id          
JOIN 
    hotels h ON rm.hotel_id = h.hotel_id        
WHERE 
    DATE(r.created_at) = CURDATE();             
      

SELECT * FROM CurrentdayReservationReport;

-- Triggers 
-- Implementar un trigger que actualice automáticamente la disponibilidad de habitaciones 
-- cuando se realice una reserva o se cancele una existente.
DELIMITER //

CREATE TRIGGER UpdateReservationAvailability
AFTER INSERT ON Reservations
FOR EACH ROW
BEGIN
    
    INSERT INTO room_availability (room_id, start_date, end_date)
    VALUES (NEW.room_id, NEW.check_in, NEW.check_out);
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER UpdateAvailabilityCancelation
AFTER UPDATE ON Reservations
FOR EACH ROW
BEGIN
    
    IF OLD.status <> 'Cancelled' AND NEW.status = 'Cancelled' THEN
        -- Eliminar el registro de disponibilidad correspondiente a la reserva cancelada
        DELETE FROM room_availability
        WHERE room_id = OLD.room_id
        AND start_date = OLD.check_in
        AND end_date = OLD.check_out;
    END IF;
END //

DELIMITER ;

-- Indice
-- Crear un índice en una columna específica (por ejemplo, la columna de ubicación en la tabla de Hoteles) para optimizar las consultas. 
-- Explicar por qué se eligió esa tabla y columna.
-- Explicacion (porque lo mas comun es que cuando una persona o varias personas hacen un paseo 
-- van a cierto lugar entonces lo que desean es saber que hoteles hay cerca del lugar que van)
CREATE INDEX idx_address ON hotels(address);

SELECT * FROM hotels WHERE address = 'San Carlos';
SELECT * FROM hotels WHERE address = 'Quepos';

-- Consultas

-- consulta 1
-- Consulta para obtener los hoteles con mayor número de reservas.

SELECT 
    h.hotel_id,                             
    h.hotel_name,                           
    COUNT(r.reservation_id) AS reservation_count 
FROM 
    Hotels h
JOIN 
    Rooms ro ON h.hotel_id = ro.hotel_id    
JOIN 
    Reservations r ON ro.room_id = r.room_id 
GROUP BY 
    h.hotel_id,                             
    h.hotel_name                            
ORDER BY 
    reservation_count DESC;                 

-- consulta 2
-- Consulta para contar cuántas habitaciones disponibles hay en un hotel específico en una fecha dada.

SELECT 
    h.hotel_name,                            
    COUNT(r.room_id) AS available_rooms_count  
FROM 
    Rooms r
JOIN 
    Hotels h ON r.hotel_id = h.hotel_id      
LEFT JOIN 
    Reservations res ON r.room_id = res.room_id
    AND res.check_in <= '2024-09-01'            
    AND res.check_out >= '2024-09-15'           
WHERE 
    r.hotel_id = 2                             
    AND res.reservation_id IS NULL              
GROUP BY 
    h.hotel_name;                              

-- consulta 3
-- Consulta para buscar hoteles por nombre

SELECT 
    hotel_id, 
    hotel_name, 
    address, 
    city, 
    state, 
    zip_code, 
    country, 
    phone_number, 
    description
FROM 
    Hotels
WHERE 
    hotel_name LIKE '%Beach%';


-- consulta 4
-- Consulta para buscar hoteles cuya ubicación comienza con un texto específico.

SELECT 
    hotel_id, 
    hotel_name, 
    address, 
    city, 
    state, 
    zip_code, 
    country, 
    phone_number, 
    description
FROM 
    Hotels
WHERE 
    address LIKE 'Puerto%';


-- consulta 5
-- Consulta para buscar hoteles cuya ubicación termina con un texto específico.

SELECT 
    hotel_id, 
    hotel_name, 
    address, 
    city, 
    state, 
    zip_code, 
    country, 
    phone_number, 
    description
FROM 
    Hotels
WHERE 
    address LIKE '%Talamanca';
    
-- consulta 6
-- Consulta para obtener las reservas de un cliente (por email) realizadas en el mes anterior.

SELECT 
    r.reservation_id, 
    r.check_in, 
    r.check_out, 
    r.total_price, 
    r.status
FROM 
    Reservations r
JOIN 
    Clients c ON r.client_id = c.client_id
WHERE 
    c.email = 'jcastillo@yahoo.com'
    AND r.check_in >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01')
    AND r.check_in < DATE_FORMAT(NOW(), '%Y-%m-15');

-- consulta 7
-- Consulta para calcular el promedio de reservas diarias en un hotel

SELECT 
    h.hotel_id,                                    
    h.hotel_name,                                  
    COUNT(r.reservation_id) AS total_reservations, 
    DATEDIFF(LAST_DAY(CURDATE() - INTERVAL 1 MONTH), DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01')) + 1 AS days_in_month, 
    COUNT(r.reservation_id) / (DATEDIFF(LAST_DAY(CURDATE() - INTERVAL 1 MONTH), DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01')) + 1) AS avg_reservations_per_day 
FROM 
    Reservations r
JOIN 
    Rooms rm ON r.room_id = rm.room_id          
JOIN 
    Hotels h ON rm.hotel_id = h.hotel_id         
WHERE 
    r.check_in >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01') 
    AND r.check_in < DATE_FORMAT(CURDATE(), '%Y-%m-01')                 
GROUP BY 
    h.hotel_id, h.hotel_name; 

-- consulta 8
-- Consulta para identificar el hotel con la mayor ocupación en el mes anterior.

SELECT 
    h.hotel_id,                                      
    h.hotel_name,                                    
    COUNT(r.reservation_id) AS total_reservations    
FROM 
    Reservations r
JOIN 
    Rooms rm ON r.room_id = rm.room_id              
JOIN 
    Hotels h ON rm.hotel_id = h.hotel_id             
WHERE 
    r.check_in >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01') 
    AND r.check_in < DATE_FORMAT(CURDATE(), '%Y-%m-01')                 
GROUP BY 
    h.hotel_id, h.hotel_name                         
ORDER BY 
    total_reservations DESC                          
LIMIT 10;                                           

-- consulta 9
-- Consulta para listar los hoteles que tienen habitaciones disponibles 
-- pero QUE no han sido reservadas en el último mes. 

SELECT DISTINCT h.hotel_id, h.hotel_name, h.address, h.city, h.state, h.zip_code, h.country
FROM Hotels h
JOIN Rooms r ON h.hotel_id = r.hotel_id
LEFT JOIN Reservations res ON r.room_id = res.room_id 
    AND res.check_in <= CURDATE() 
    AND res.check_out >= CURDATE() - INTERVAL 1 MONTH
LEFT JOIN Room_availability ra ON r.room_id = ra.room_id 
    AND ra.start_date <= CURDATE() 
    AND ra.end_date >= CURDATE()
WHERE res.reservation_id IS NULL
    AND ra.availability_id IS NOT NULL
ORDER BY h.hotel_name;








