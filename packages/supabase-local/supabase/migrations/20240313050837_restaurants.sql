create extension IF NOT EXISTS postgis with schema extensions;

create table if not exists public.restaurants (
	id int generated by default as identity primary key,
	name text not null,
  delivery_areas JSONB,
	location geography(POINT) not null
);

create index restaurants_geo_index
  on public.restaurants
  using GIST (location);

INSERT INTO public.restaurants (name, delivery_areas, location)
VALUES
    ('Supa Burger', '
      [
        {"id": "1", "fee": 150, "polygon": {"type": "Polygon", "coordinates": [[[0, 0], [0, 3], [3, 3], [3, 0], [0, 0]]]}},
        {"id": "1", "fee": 150, "polygon": {"type": "Polygon", "coordinates": [[[2, 2], [2, 4], [4, 4], [4, 2], [2, 2]]]}}
      ]'::jsonb, ST_Point(3.0, 2.0)),
    ('Supa Pizza', '[{"id": "2", "fee": 100, "polygon": {"type": "Polygon", "coordinates": [[[0, 0], [0, -3], [-3, -3], [-3, 0], [0, 0]]]}}]'::jsonb, ST_Point(-1.0, 2.0)),
    ('Supa Taco', '[{"id": "3", "fee": 200, "polygon": {"type": "Polygon", "coordinates": [[[0, 0], [0, 5], [1, 5], [1, 0], [0, 0]]]}}]'::jsonb, ST_Point(-1.0, 1.0));


create or replace function nearby_restaurants(lat float, long float)
returns table (id public.restaurants.id%TYPE, name public.restaurants.name%TYPE, lat float, long float, dist_meters float)
language sql
as $$
  select id, name, st_y(location::geometry) as lat, st_x(location::geometry) as long, st_distance(location, st_point(long, lat)::geography) as dist_meters
  from public.restaurants
  order by location <-> st_point(long, lat)::geography;
$$;


create or replace function restaurants_in_view(min_lat float, min_long float, max_lat float, max_long float)
returns table (id public.restaurants.id%TYPE, name public.restaurants.name%TYPE, lat float, long float)
language sql
as $$
	select id, name, st_y(location::geometry) as lat, st_x(location::geometry) as long
	from public.restaurants
	where location && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326)
$$;


CREATE OR REPLACE FUNCTION restaurants_delivering_to(lat FLOAT, long FLOAT)
RETURNS TABLE (
    id INT,
    name TEXT,
    location GEOGRAPHY(POINT),
    delivery_areas JSONB
)
LANGUAGE SQL
AS $$
SELECT
    r.id,
    r.name,
    r.location,
    r.delivery_areas
FROM
    public.restaurants r
WHERE
    EXISTS (
        SELECT 1
        FROM jsonb_array_elements(r.delivery_areas) AS areas
        WHERE ST_Intersects(
            ST_SetSRID(ST_MakePoint(long, lat), 4326)::geometry,
            ST_GeomFromGeoJSON(areas->>'polygon')::geometry
        )
    );
$$;

-- SELECT * FROM restaurants_delivering_to(4, 3);