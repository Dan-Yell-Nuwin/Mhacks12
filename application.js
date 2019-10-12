// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA6Cw1zvXTXy7v79SLj681ZNFfkSOhHy_g",
    authDomain: "voter-4132c.firebaseapp.com",
    databaseURL: "https://voter-4132c.firebaseio.com",
    projectId: "voter-4132c",
    storageBucket: "voter-4132c.appspot.com",
    messagingSenderId: "436270543492",
    appId: "1:436270543492:web:f950b7921c76885accc8d1",
    measurementId: "G-LNZGT6V25Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


var counties = []
var address = ["1101 3rd Street, West Lafayette, IN 47906"]

//func callAPI(address){

//for(var i = 0; i < address.length;i++){

    //var county;

fetch('https://www.googleapis.com/civicinfo/v2/voterinfo?address=' + address + '&key=AIzaSyB4ocz-4NHCGXM8cTfXsYRSVU6Wlz_3g4o')
            .then(function(response)
            { return response.json(); })
            .then(function(json) {
                var localCandidates = [];
                for (var contest in json.contests) {
                    var role = json.contests[contest].office;
                    var candidates = {}
                    candidates[role] = json.contests[contest].candidates;
                    localCandidates.push(candidates);
                }
                writeLocalRepresentativeData(localCandidates);
          });
          /*
          county
            JSONArray
              office, name, social media, number, address
          */

  fetch('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyB4ocz-4NHCGXM8cTfXsYRSVU6Wlz_3g4o&address=' + address)
          .then(function(response)
          { return response.json(); })
          .then(function(json) {
          var inOffice = [];
          for (var i in json.offices) {
            var indices = json.offices[i].officialIndices;
            for (var k = 0; k < indices.length; k++) {
                inOffice.push(json.officials[indices[k]]);
                inOffice[inOffice.length-1].position = json.offices[i].name;
            }
          }
          writeNationalStateData(inOffice);

        });

function writeNationalStateData(data) {

    firebase.database().ref().set({
        Representatives: data
    });
}

function writeLocalRepresentativeData(candidates) {
    for (i in candidates) {
        var position = constests[i].office;
        console.log(position);
        var str = "Political Database/Local/" + position;
        var newObj = {};
        newObj[position] = candidates[i];
        firebase.database().ref(str).set(newObj);
    }
}