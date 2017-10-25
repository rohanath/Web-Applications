var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended: false});
var result,message,fl = 0;

module.exports = function(app){

app.get('/',function(req,res)
{
    res.render("calc");
});

app.post('/', urlencodedparser, function(req,res)
{
  if(req.body.val1 == "" || req.body.val2 == "" || isNaN(req.body.val1) || isNaN(req.body.val2) )
  {
      fl = 1;
      message = "Either one of the fields is empty or is not a numeric value";
      res.json({message : message, flag : fl});
      fl = 0;
  }
  else {
    if(req.body.task == "add")
    {
        result = Number(req.body.val1) + Number(req.body.val2);
        res.json({result : result, flag : fl});
    }

    if(req.body.task == "subtract")
    {
      result = Number(req.body.val1) - Number(req.body.val2);
      res.json({result : result, flag : fl});
    }

    if(req.body.task == "multiply")
    {
      result = Number(req.body.val1) * Number(req.body.val2);
      res.json({result : result, flag : fl});
    }

    if(req.body.task == "divide")
    {
      result = Number(req.body.val1) / Number(req.body.val2);
      res.json({result : result, flag : fl});
    }
  }
});
}
