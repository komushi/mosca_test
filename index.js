var mosca = require('mosca');

var pubsubsettings = {
  type: "redis",
  redis: require('redis'),
  db: 0,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};

var moscaSettings = {
  port: 1883,           //mosca (mqtt) port
  backend: pubsubsettings,   //pubsubsettings is the object we created above 
  persistence: {
    factory: mosca.persistence.Redis,
    host: "localhost",
    port: 6379
  }
};

var server = new mosca.Server(moscaSettings);   //here we start mosca
server.on('ready', setup);  //on init it fires up setup()


server.on('clientConnected', function(client) {
    console.log('client connected', client.id);     
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
