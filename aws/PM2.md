1️⃣ What is PM2?

PM2 = Process Manager for Node.js applications.

In simple words:

PM2 keeps your Node server alive, restarts it if it crashes, and lets it run in background.

Without PM2:

You run node server.js

Close SSH ❌ → app stops

With PM2:

App runs 24/7

SSH disconnect doesn’t matter

Auto restart on crash

Easy logs & monitoring

2️⃣ Why PM2 is Needed (Real Scenario)

Imagine:

Your EC2 restarts

App crashes due to error

You logout from SSH

PM2 handles:

Restart on crash

Start on server reboot

Multiple Node apps

Zero-downtime reloads

👉 PM2 = production safety net

3️⃣ Install PM2
sudo npm install pm2 -g


Check:

pm2 -v

4️⃣ Start an App Using PM2
Basic start
pm2 start server.js

Give app a name (recommended)
pm2 start server.js --name my-node-app

Start with environment
pm2 start server.js --env production

5️⃣ List Running Applications
pm2 list


Shows:

App name

Status (online / stopped)

CPU & memory usage

Restart count

6️⃣ Stop / Restart / Delete App
Stop app
pm2 stop my-node-app

Restart app
pm2 restart my-node-app

Reload (zero downtime)
pm2 reload my-node-app

Delete app
pm2 delete my-node-app

7️⃣ Logs (Super Useful)
View logs
pm2 logs

Logs for specific app
pm2 logs my-node-app

Clear logs
pm2 flush


Log files are stored in:

~/.pm2/logs

8️⃣ Run App on EC2 Restart (VERY IMPORTANT)

By default:
❌ PM2 apps won’t start after reboot

Generate startup script
pm2 startup


You’ll see a command like:

sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user


👉 Copy & run it

Save running apps
pm2 save


Now:
✅ EC2 restart → app auto starts

9️⃣ Watch Mode (Auto Restart on Code Change)
pm2 start server.js --watch


⚠️ Good for testing
❌ Avoid in production (performance)

🔟 Cluster Mode (Advanced but Important)

Use all CPU cores:

pm2 start server.js -i max


or

pm2 start server.js -i 2


Benefits:

Better performance

Load balancing

High availability

1️⃣1️⃣ PM2 Monitoring
Basic monitor
pm2 monit


Shows:

CPU usage

Memory

Logs

Restarts

1️⃣2️⃣ PM2 with npm scripts
pm2 start npm --name api -- start


Useful when using:

"scripts": {
  "start": "node server.js"
}

1️⃣3️⃣ Ecosystem File (Production Setup)

Create config file:

pm2 ecosystem


Example:

module.exports = {
  apps: [
    {
      name: "api",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};


Run:

pm2 start ecosystem.config.js --env production

1️⃣4️⃣ Common PM2 Commands (Quick Notes)
Command	Purpose
pm2 start file.js	Start app
pm2 list	Show all apps
pm2 stop id/name	Stop app
pm2 restart id/name	Restart
pm2 reload id/name	Zero downtime reload
pm2 delete id/name	Remove app
pm2 logs	View logs
pm2 monit	Monitor
pm2 startup	Auto start on reboot
pm2 save	Save process list
1️⃣5️⃣ Interview-Friendly Explanation

PM2 is a Node.js process manager that keeps applications running continuously, handles crashes, enables clustering, provides logging and monitoring, and ensures apps restart automatically after server reboot.