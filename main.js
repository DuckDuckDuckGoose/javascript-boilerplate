window.addEventListener(`load`, () => {
  console.log(`Page loaded`);
    let inputs = {};
    let startTime;
    let exit = (value) => {
      let totalTime = Date.now() - startTime;
      console.log(`Program completed in ${totalTime}ms, produced answer: ${value}`);
    }
    startTime = Date.now();
    main(inputs, exit);
});
