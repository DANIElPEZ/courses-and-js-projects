export const logger = (req, res, next)=>{
     const timestamp = new Date().toISOString();
     const start =Date.now();
     console.log(`[${timestamp}] ${req.method} ${req.url} ${req.ip}`);

     res.on('finish', () => { //finaliza la solicitud
          const duration = Date.now() - start;
          console.log(`[${timestamp}] ${res.statusCode} - ${duration}ms`);
     });

     next(); //pasa al siguiente middleware
};