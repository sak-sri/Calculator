import React,{Component} from 'react'
import classes from './App.module.css'
import Screen from './screen'
class App extends Component{
  state={
    str:"",
    error_flag:false,
  }
    evaluate=()=>{
    let cp=this.state.str;
    let arr=[];
    let operands="";
    console.log(cp);
    for(let i=0;i<cp.length;i++)
    {
      if(cp[i]!=='+' && cp[i]!=='-' && cp[i]!=='*' && cp[i]!=='/')
      {
        operands+=cp[i];
      }
      else
      {
        if(operands!=="")
          arr.push(parseFloat(operands));
        operands="";
        arr.push(cp[i]);
      }
    }
    if(operands!=="")
    {
      arr.push(parseFloat(operands));
    }
    console.log(arr);
    let temp=[];
    let x=[];
    for(let i=0;i<arr.length;i++)
    {
       if(arr[i]==='+' || arr[i]==='-' || arr[i]==='*' || arr[i]==='/')
       {
          if(arr[i]==='+' || arr[i]==='-')
          {
            while(temp.length!==0)
            {
              x.push(temp[temp.length-1]);
              temp.pop();
            }
            temp.push(arr[i]);
          }
          else
          {
              while(temp.length!==0 && (temp[temp.length-1]==='/' || temp[temp.length-1]==='*'))
              {
                x.push(temp[temp.length-1]);
                temp.pop();
              }
              temp.push(arr[i]);
          }
       }
       else
       {
         x.push(arr[i]);
       }
    }
    while(temp.length!==0)
    {
      x.push(temp[temp.length-1]);
      temp.pop();
    }
   // console.log(x);
    temp=[];
    for(let i=0;i<x.length;i++)
    {
      if(x[i]==='+' || x[i]==='-' || x[i]==='/' || x[i]==='*')
      {
        if(temp.length<2)
        {
          this.setState({error_flag:true});
          break;
        }
        else
        {
          let op1=temp[temp.length-1];
          temp.pop();
          let op2=temp[temp.length-1];
          temp.pop();
          if(x[i]==='+')
          {
            temp.push(op2+op1);
            console.log(op2+op1);
          }
          else if(x[i]==='-')
          {
            temp.push(op2-op1);
            console.log(op2-op1);
          }
          else if(x[i]==='/')
          {
            temp.push(op2/op1);
            console.log(op2/op1);
          }
          else
          {
            temp.push(op2*op1);
            console.log(op2*op1);
          }
        }
      }
      else
      {
        temp.push(x[i]);
      }
    }
   // console.log(temp);
    if(this.state.error_flag===false)
      this.setState({str:temp[0]});
  }
  check_valid_exp=()=>{
    let temp=this.state.str;
    if(temp==="" || (temp[temp.length-1]==='+' || temp[temp.length-1]==='-' || temp[temp.length-1]==='*' || temp[temp.length-1]==='/'))
    {
      this.setState({error_flag:false});
      return false;
    }
    return true;
  }
  render()
  {
    return(
      <div className={classes.Frame}>
        <Screen exp={this.state.str} error_val={this.state.error_flag}></Screen> 
        <table className={classes.Table} cellSpacing="0">
          <tbody>
            <tr>
              <td onClick={()=>{
                if(this.check_valid_exp())
                  this.setState({str:this.state.str+"+"})
              }}>+</td>
              <td onClick={(event)=>{
                if(this.check_valid_exp())
                  this.setState({str:this.state.str+"/"})
              }}>/</td>
              <td onClick={(event)=>{
                if(this.check_valid_exp)
                  this.setState({str:this.state.str+"*"})
              }}>*</td>
              <td rowSpan="2" onClick={()=>this.setState({str:"",error_flag:false})}>AC</td>
            </tr>
            <tr>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"1"})
              }}>1</td>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"2"})
              }}>2</td>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"3"})
              }}>3</td>
            </tr>
            <tr>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"4"})
              }}>4</td>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"5"})
              }}>5</td>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"6"})
              }}>6</td>
              <td rowSpan="3" style={{WebkitBorderBottomRightRadius:"25px"}} onClick={this.evaluate}>=</td>
            </tr>
            <tr>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"7"})
              }}>7</td>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"8"})
              }}>8</td>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"9"})
              }}>9</td>
            </tr>
            <tr>
              <td style={{borderBottomLeftRadius:"25px"}} onClick={(event)=>{
                this.setState({str:this.state.str+"."})
              }}>.</td>
              <td onClick={(event)=>{
                this.setState({str:this.state.str+"0"})
              }}>0</td>
              <td onClick={()=>this.setState({str:this.state.str.slice(0,this.state.str.length-1)})}>C</td>
            </tr>
            </tbody>
        </table>
      </div>
    )
  }
}
export default App