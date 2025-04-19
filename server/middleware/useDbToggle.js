export const useDbToggle = (req, res, next) => {
    const useDbHeader = req.headers['x-use-db'];
    req.useDb = useDbHeader === 'true' || process.env.USE_DB === 'true';
    next();
  };
  