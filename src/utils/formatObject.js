exports.formatObjectHome = (data)=>{
    let result = {
        id: data.id,
        name: data.name,
        image: data.background_image ? data.background_image : null,
        rating: data.rating,
        ratings_count: data.ratings_count,
        genres: data.genres && data.genres.map(e => {
        return {
            id: e.id,
            name: e.name,
        };
        }),
    };
    return result;
}