import Star from "./star";

export default {
    none: [Star.open, Star.open, Star.open, Star.open, Star.open],
    oneStar: [Star.closed, Star.open, Star.open, Star.open, Star.open],
    twoStars: [Star.closed, Star.closed, Star.open, Star.open, Star.open],
    threeStars: [Star.closed, Star.closed, Star.closed, Star.open, Star.open],
    fourStars: [Star.closed, Star.closed, Star.closed, Star.closed, Star.open],
    fiveStars: [Star.closed, Star.closed, Star.closed, Star.closed, Star.closed],
    Yes: Star.closed,
    No: Star.open,
};