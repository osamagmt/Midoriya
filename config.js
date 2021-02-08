exports.Token = "Nzg2MjQ2MzI3NzE2Njc1NTk2.X9Dm9A.5Tk440w02DMTM-nUoQSsHaJ2u90"
exports.Owner = "728590937441304586"; 
exports.Default_Prefix = ","; 
exports.Color = "RANDOM";
exports.Support = `https://discord.gg/RhnByc8yjj`; 
exports.webhookID = '802132071396933693'
exports.webhookToken = 'lG0PFEx1DCJrk7eG6HqSSuJ5qBmHmO5DbHBKrZX3CnTWYu6hP7tMeiZiEhJet6_C0k9J'
exports.unicolor = "#8015EA"
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://SambitOp:UZtgrCxAyND2Sfm7@cluster0.tvh4e.mongodb.net/devil?retryWrites=true&w=majority");
exports.db = db;
exports.database = "mongodb+srv://SambitOp:UZtgrCxAyND2Sfm7@cluster0.tvh4e.mongodb.net/devil?retryWrites=true&w=majority";
exports.join = "welcome {user} invited by ({inviter}) => inviter invites: [invites]";
exports.leave = "{user} left the guild invited by ({inviter})";
exports.unkown = "{user} has joined , but i can't figure out who invited him.";
exports.unkownleave = "{user} has left, but i can't figure out who invited him"