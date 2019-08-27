import PropertiesReader from 'properties-reader'

global.properties =
  new PropertiesReader('./persistence/db.test.properties').getAllProperties()
