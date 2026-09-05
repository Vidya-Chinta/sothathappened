export const readingTime = (body = "") =>
  Math.max(
    1,
    Math.ceil(body.replace(/```[\s\S]*?```/g, "").split(/\s+/).length / 220),
  );
