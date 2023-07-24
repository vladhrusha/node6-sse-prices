
  const removeClient = ({ newClient, clients }) => {
    clients.splice(clients.indexOf(newClient), 1);
  };
  const addClient = ({ res, clients }) => {
    const clientId = Date.now();

    const newClient = {
      id: clientId,
      res,
    };
    clients.push(newClient);
    return newClient;
  };

  module.exports = { addClient, removeClient };

