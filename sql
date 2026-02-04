 insert into siswa values
    -> ('1019200033','AGIN GINASTIAR','L','XI RPL A'),
    -> ('1019200073','ANGGI NURMAYANTI','P','XI RPL B'),
    -> ('1019200151','DEDE RAHMAT RAMADIANA','P','XI RPL C'),
    -> ('1019200171','DEWINTA DWI HANI','P','XI RPL A'),
    -> ('1019200230','FARIZ ZANUAR NASABI','L','XI RPL B'),
    -> ('1019200259','HERA HERDIANA','P','XI RPL C');

INSERT INTO guru (nitp, nama_guru, jenis_kelamin, alamat) VALUES
('G001','Rio Bambang Anariyono','L','Majalengka'),
('G002','Nisa Farhatunnisa','P','Talaga'),
('G003','Rezza Fauzia Husnain','P','Rajagaluh');

INSERT INTO mata_pelajaran (kode_mapel, nitp, nama_mapel) VALUES
('M001','G001','Basis Data'),
('M002','G001','Pemrograman Web'),
('M003','G002','Pemodelan Perangkat Lunak'),
('M004','G003','Pemrograman Berorientasi Objek');

INSERT INTO nilai (kode_nilai, nis, kode_mapel, nilai) VALUES
('N001','1019200033','M001',85),
('N002','1019200033','M002',80),
('N003','1019200033','M003',75),
('N004','1019200033','M004',90),
('N005','1019200073','M001',78),
('N006','1019200073','M002',85),
('N007','1019200073','M003',70),
('N008','1019200073','M004',88);

SELECT 
    s.nis,
    s.nama_siswa,
    AVG(n.nilai) AS rata_rata
FROM nilai n
JOIN siswa s ON n.nis = s.nis
GROUP BY s.nis, s.nama_siswa;

SELECT 
    s.nis,
    s.nama_siswa,
    MAX(n.nilai) AS nilai_terbesar,
    MIN(n.nilai) AS nilai_terkecil
FROM nilai n
JOIN siswa s ON n.nis = s.nis
GROUP BY s.nis, s.nama_siswa;

SELECT 
    s.nis,
    s.nama_siswa,
    SUM(n.nilai) AS total_nilai
FROM nilai n
JOIN siswa s ON n.nis = s.nis
GROUP BY s.nis, s.nama_siswa;

SELECT 
    s.nis,
    s.nama_siswa,
    ROUND(AVG(n.nilai), 2) AS rata_rata
FROM nilai n
JOIN siswa s ON n.nis = s.nis
GROUP BY s.nis, s.nama_siswa;

SELECT ROUND(AVG(nilai), 2) AS rata_rata
FROM nilai;

SELECT *
FROM siswa
WHERE nama_siswa LIKE '%o%';

SELECT *
FROM siswa
WHERE LOWER(nama_siswa) LIKE '%o%';
