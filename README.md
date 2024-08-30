Base de datos MYSQL

Primera Forma Normal (1NF)

    Administrators: o Columnas: admin_id, admin_name, admin_last_name, admin_password, admin_email, created_at. o Todos los valores en las columnas son atómicos. Por ejemplo, admin_name no contiene múltiples nombres, sino un solo valor.
    Clients: o Columnas: client_id, client_name, client_last_name, email, created_at. o Cada columna tiene un único valor, y client_name no contiene varios nombres.
    Hotels: o Columnas: hotel_id, hotel_name, address, city, state, zip_code, country, phone_number, description, created_at. o No hay listas ni conjuntos en ninguna columna.
    Rooms: o Columnas: room_id, hotel_id, room_type, price, capacity, description. o Cada columna almacena un valor único.
    Room_availability: o Columnas: availability_id, room_id, start_date, end_date. o Las fechas start_date y end_date están almacenadas como valores atómicos.
    Reservations: o Columnas: reservation_id, client_id, room_id, check_in, check_out, total_price, status, created_at. o Cada columna tiene valores atómicos, como check_in y check_out como fechas únicas.
    Payments: o Columnas: payment_id, reservation_id, amount, payment_date, payment_method. o amount, payment_date, y payment_method son valores únicos.
    Reports: o Columnas: report_id, admin_id, client_id, report_type, report_date, content. o Cada columna tiene valores individuales.

Segunda Forma Normal (2NF)

    Administrators: o Clave primaria: admin_id. o Los atributos admin_name, admin_last_name, admin_password, admin_email, created_at dependen únicamente de admin_id.
    Clients: o Clave primaria: client_id. o Los atributos client_name, client_last_name, email, created_at dependen exclusivamente de client_id.
    Hotels: o Clave primaria: hotel_id. o Los atributos hotel_name, address, city, state, zip_code, country, phone_number, description, created_at dependen de hotel_id.
    Rooms: o Clave primaria: room_id. o Los atributos hotel_id, room_type, price, capacity, description dependen solamente de room_id. La columna hotel_id es una clave foránea, pero no afecta la dependencia funcional de room_id.
    Room_availability: o Clave primaria: availability_id. o Los atributos room_id, start_date, end_date dependen únicamente de availability_id.
    Reservations: o Clave primaria: reservation_id. o Los atributos client_id, room_id, check_in, check_out, total_price, status, created_at dependen de reservation_id.
    Payments: o Clave primaria: payment_id. o Los atributos reservation_id, amount, payment_date, payment_method dependen solo de payment_id.
    Reports: o Clave primaria: report_id. o Los atributos admin_id, client_id, report_type, report_date, content dependen exclusivamente de report_id.

Tercera Forma Normal (3NF)

    Administrators: o Clave primaria: admin_id. o Los atributos admin_name, admin_last_name, admin_password, admin_email, created_at dependen únicamente de admin_id, y no hay atributos no clave que dependan de otros atributos no clave.
    Clients: o Clave primaria: client_id. o Los atributos client_name, client_last_name, email, created_at dependen solo de client_id.
    Hotels: o Clave primaria: hotel_id. o Los atributos hotel_name, address, city, state, zip_code, country, phone_number, description, created_at dependen de hotel_id, sin atributos adicionales que causen dependencias transitivas.
    Rooms: o Clave primaria: room_id. o Los atributos hotel_id, room_type, price, capacity, description dependen únicamente de room_id, sin dependencias transitivas entre atributos.
    Room_availability: o Clave primaria: availability_id. o Los atributos room_id, start_date, end_date dependen solo de availability_id. room_id es una clave foránea y no causa dependencia transitoria en esta tabla.
    Reservations: o Clave primaria: reservation_id. o Los atributos client_id, room_id, check_in, check_out, total_price, status, created_at dependen de reservation_id, sin dependencias transitivas.
    Payments: o Clave primaria: payment_id. o Los atributos reservation_id, amount, payment_date, payment_method dependen solo de payment_id. reservation_id es una clave foránea que no causa dependencias transitivas.
    Reports: o Clave primaria: report_id. o Los atributos admin_id, client_id, report_type, report_date, content dependen exclusivamente de report_id, sin dependencias transitivas.
