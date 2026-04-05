console.time();
for(let i=0;i<1000000000;i++)
{
    if(i%500000000==0)
    {
        console.log(i);
    }
}
for(let j=0;j<1000000000;j++)
{
    if(j%500000000==0)
    {
        console.log(j);
    }
}
console.timeEnd();