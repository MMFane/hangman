// const getPuzzle = (wordCount) => new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
//     request.addEventListener("readystatechange", (e) => {
//       if (e.target.readyState === 4 && e.target.status === 200) {
//         const data = JSON.parse(e.target.responseText);
//         resolve(data.puzzle);
//       } else if (e.target.readyState === 4) {
//         reject("Something went wrong in getPuzzle");
//       }
//     });
//     request.open("GET", `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
//     request.send();
//   });

const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );
  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error("getPuzzle: Unable to fetch puzzle");
  }
};

const getPuzzleOld = (wordCount) => {
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Unable to fetch puzzle");
      }
    })
    .then((data) => {
      return data.puzzle;
    });
};

// fetch("http://puzzle.mead.io/puzzle", {})
//   .then((response) => {
//     if (response.status === 200) {
//       return response.json();
//     } else {
//       throw new Error("Unable to fetch puzzle");
//     }
//   })
//   .then((data) => {
//     console.log(data.puzzle);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
