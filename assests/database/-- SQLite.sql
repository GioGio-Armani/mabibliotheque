-- SQLite
UPDATE sqlite_sequence SET seq = (SELECT COUNT(*) FROM livres) WHERE name = 'livres'