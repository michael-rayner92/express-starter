import "colors";

// Load DB

const importData = async () => {
  try {
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
