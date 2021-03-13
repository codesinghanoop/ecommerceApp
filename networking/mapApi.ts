const HERE_API_KEY = 'NX7KVcC-OXcN1svFyv8hIsYnkMgc3XZqMQZuZ50aMSo'

export function getAddressFromCoordinates({ latitude, longitude } : { latitude: number, longitude: number }) {
    return new Promise((resolve) => {
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}&language=en`
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          // the response had a deeply nested structure :/
          if (resJson
            && resJson.Response
            && resJson.Response.View
            && resJson.Response.View[0]
            && resJson.Response.View[0].Result
            && resJson.Response.View[0].Result[0]) {
            resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
          } else {
            resolve()
          }
        })
        .catch((e) => {
          console.log('Error in getAddressFromCoordinates', e)
          resolve()
        })
    })
}