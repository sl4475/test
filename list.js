function Node(data){
        this.data=data;
        this.next=null;
        

       this.getData=function(){
                return this.data;
        }

	this.getNext=function(){
		return this.next;
	}

	this.setData=function(data){
		this.data=data;
	}

}


function List(){
	this.head=null;
	this.length=0	

	this.add=function(data){
		this.length++;
		let node = new Node(data);

		if(this.head==null){
			this.head=node;
		}	
		else{
			let cur= this.head;
			while(cur.next!=null){
				cur=cur.next;
			}
			cur.next=node;
		}	

	}

	this.getHead=function(){
		//console.log('got head');
		return this.head;
	}
	
	this.setHead=function(node){
		this.head=node;
		console.log('head set to' + node);
	}
	
	this.getLength=function(){
		return this.length;
	}

	this.get=function(pos){
		if(this.length<pos ||pos==0){
			console.log('position invalid');
		}
		else{
			let cur= this.head;
			let count=1;
			while(count<pos){
				count++;
				cur=cur.getNext();
			}
			return cur.getData();
		}

	}
	
	this.delete= function(pos){
		if(this.length<pos ||pos==0){
                        console.log('position invalid');
                }
		else if(pos==1){
			this.head=this.head.getNext();
			this.length--;
		}
                else{
                        let cur= this.head;
                        let count=2;
                        while(count<pos){
                                count++;
                                cur=cur.getNext();
                        }
               		cur.next=cur.getNext().getNext();
			this.length--; 
		}
	}
	this.edit=function(pos, data){
                if(this.length<pos ||pos==0){
                        console.log('position invalid');
                }
                else{
                        let cur= this.head;
                        let count=1;
                        while(count<pos){
                                count++;
                                cur=cur.getNext();
                        }
                        cur.setData(data);
                }

        }
/*	this.printList=function(pos, data){
		let ret='';
		let cur = list.getHead();
		while(cur!=null){
        		ret+= cur.getData() 
			ret += '\n';
      		  	cur=cur.next;
		}
		console.log(ret);
	}
*/
}




let list = new List();
list.add('hi1');
list.add('hi2');
list.add('hi3');
list.add('hi4');
list.delete(3);
//list.edit(3,'hi33333');
//list.printList();



let express = require('express'); 
let bodyParser=require('body-parser');
let app = express();
let urlencodedParser= bodyParser.urlencoded({extended: false});
app.set('view engine', 'ejs');


//GET ENTIRE LIST
app.get('/list', function(req, res) {
        console.log(req.method);
let cur = list.getHead();
while(cur!=null){
        res.write(cur.getData() + '\n');
        cur=cur.next;
}
res.end();

});


//GET SPECIFIC POSITION
app.get('/list/get/:id', function(req, res) {
   	console.log(req.method);
	 res.send('Position ' + req.params.id  + ': ' + list.get( parseInt(req.params.id) )  );
});


//ADD  TO LIST
app.get('/list/add', function(req,res){
//	res.render('add',{qs:req.query});
	res.render('add',{qs:list});	

});
app.post('/list/add', urlencodedParser ,function(req,res){
/*	console.log(req.method);
	list.add(req.params.data);
	console.log('postman was here');
	res.send('Added ' + req.params.data+ ' to list');
*/
	list.add(''+req.body.data);

	res.render('add-success',  {data:req.body});
});
//DELETE  POSITION

app.get('/list/delete', function(req,res){
//      res.render('add',{qs:req.query});
        res.render('delete',{qs:list});

});
app.post('/list/delete', urlencodedParser ,function(req,res){
        list.delete(parseInt(req.body.data));

        res.render('delete-success',  {data:req.body});
});
//EDIT  POSITION

app.get('/list/edit', function(req,res){
//      res.render('add',{qs:req.query});
        res.render('edit',{qs:list});

});
app.post('/list/edit', urlencodedParser ,function(req,res){
        list.edit(parseInt(req.body.data),req.body.data);

        res.render('edit-success',  {data:req.body});
});


app.listen(process.env.PORT || 5000)



