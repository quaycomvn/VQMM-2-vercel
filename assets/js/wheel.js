const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultBox = document.getElementById("result");

const prizes = [
  "🎁 Quà tặng may mắn",
  "💰 10.000 VNĐ",
  "🎉 Chúc bạn may mắn",
  "🎟️ Thêm 1 lượt quay",
  "😅 Chưa trúng thưởng",
  "🏆 Giải đặc biệt"
];

const colors = ["#ffcc00","#ff9999","#66ccff","#99ff99","#ffb6c1","#c39bd3"];
let angle = 0;
let spinning = false;

function drawWheel(){
  const r = canvas.width/2;
  const step = 2*Math.PI/prizes.length;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  prizes.forEach((text,i)=>{
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(r,r);
    ctx.arc(r,r,r,angle+i*step,angle+(i+1)*step);
    ctx.fill();

    ctx.save();
    ctx.translate(r,r);
    ctx.rotate(angle+(i+0.5)*step);
    ctx.textAlign="right";
    ctx.fillStyle="#000";
    ctx.font="bold 14px Arial";
    ctx.fillText(text, r-10, 5);
    ctx.restore();
  });
}

drawWheel();

spinBtn.onclick = ()=>{
  if(spinning) return;
  spinning = true;
  resultBox.innerHTML = "⏳ Đang quay...";
  const spinAngle = Math.random()*360 + 1440;
  let current = 0;

  const timer = setInterval(()=>{
    current += 20;
    angle += 0.15;
    drawWheel();

    if(current >= spinAngle){
      clearInterval(timer);
      spinning = false;
      const index = Math.floor(
        prizes.length - (angle%(2*Math.PI))/(2*Math.PI)*prizes.length
      ) % prizes.length;

      resultBox.innerHTML = "🎯 KẾT QUẢ QUAY:<br><strong>"+prizes[index]+"</strong>";
    }
  },20);
};
