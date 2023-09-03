export const Caching = async () => {
    const res = await fetch(
        "http://worldtimeapi.org/api/timezone/America/Argentina/Salta",
        { next: { revalidate: 6 } }
    );
    return res;
};
