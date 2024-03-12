const bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path'),
    cors = require('cors'),
    compression = require('compression');
module.exports = () => {
    var app = express();
    app.use(compression())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(cors());
    // routes
    require('../routes/index')(app);
    require('../routes/Project.routes')(app);

    app.use("/", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept, Authorization");
        next();
    });
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
    return app;
};