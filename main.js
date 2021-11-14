window.addEventListener(`load`, () => {
  console.log(`Page loaded`);
  fetchHandler(`./inputs`).then((data) => {
    let files = getFiles(data);
    let promises = [];
    let inputs = {};
    files.forEach((fileName, i) => {
      let promise = fetchHandler(`./inputs/${fileName}`);
      promise.then((data) => {
        inputs[fileName.split(`.`)[0]] = data;
      }, (err) => {
        throw err;
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      let startTime;
      let exit = (value) => {
        let totalTime = Date.now() - startTime;
        console.log(`Program completed in ${totalTime}ms, produced answer: ${value}`);
      }
      startTime = Date.now();
      main(inputs, exit);
    });
  }, (err) => {
    throw err;
  });
});


function getFiles(data) {
  let startIndex = data.search(/<ul>/);
  let endIndex = data.search(/<\/ul>/);
  if(startIndex == -1 || endIndex == -1) {
    throw new Error(`<ul> tag not found in: ${data}`);
  }
  let listElements = data.slice(startIndex + 5, endIndex - 1).split(`\n`);
  if(listElements.length > 0 && listElements[0] != ``) {
      let fileNames = listElements.map((element) => element.split(`"`)[1]);
      return fileNames;
  }
  return [];
}

function fetchHandler(url) {
  return new Promise(async (resolve, reject) => {
    fetch(url).then(
      (res) => {
        if(res.ok) {
          res.text().then((data) => {
            resolve(data);
          });
        } else {
          reject(res.statusText);
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
}
