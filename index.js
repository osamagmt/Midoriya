const { ShardingManager } = require('discord.js');

const { Token } = require("./config.js");

const manager = new ShardingManager('./server.js', { token: Token, autoSpawn: true, respawn: true, totalShards: "auto" }); 
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn(manager.totalShards, 10000);
;(async () => {
let { spawn } = require('child_process')
 
 await new Promise(async (resolve, reject) => {
 const spawner = spawn('npm', ['i', '-u', '--python=python3', 'dbd.js'], { shell: true })
 
 spawner.on('error', err => reject(err))
 spawner.stderr.pipe(process.stderr)
 spawner.stdout.pipe(process.stdout)
 
 spawner.on('end', () => resolve(undefined))
 })
 
 console.log('Done')
})()