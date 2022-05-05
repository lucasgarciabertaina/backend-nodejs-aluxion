
module.exports = async (req, res) => {
  const { amazonS3, amazonParams } = res.locals;
  const { Key, name } = req.body;
  const { operation } = req.query;

  switch (operation) {
    case 'change_name':
      if(!Key || !name){
        res.send('[error] Incomplete information.').status(404);
        break;
      }
      
      const objectParams = { ...amazonParams, Key};
      
      const object = await amazonS3.getObject(objectParams).promise();
      const buffer = object.Body;
      const fileSystem = Key.split('.')[1];

      const uploadParams = {...amazonParams, Key:`${name}.${fileSystem}`, Body: buffer  }
    
      const newObject = await amazonS3.upload(uploadParams).promise();

      await amazonS3.deleteObject(objectParams).promise();

      res.send({message: 'File has been changed.', file: newObject});
      break;
    case 'get_url':
      if(!Key){
        res.send('[error] Incomplete information.').status(404);
        break;
      }

      const urlParams = { ...amazonParams, Key };

      const fileStream = amazonS3.getObject(urlParams).createReadStream();
      fileStream.pipe(res);
      res.attachment(Key);
      break;
    default:
      res.send('[error] Invalid operation.').status(404);
      break;
  }
}
