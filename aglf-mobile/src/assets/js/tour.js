// Define the tour!
var tour = {
  id: "demo-tour",
  showPrevButton: true,
  steps: [

    {
      title: "Team Section",
      content: "This is part where you can select your team, manipulate players and manage transfers",
      target: "ft-users",
      placement: "right"
    },
    {
      title: "Home Screen",
      content: "Check latest results, teams and players standings",
      target: "ft-home",
      placement: "right"
    },
    {
      title: "Leaderboard",
      content: "Check you team rankings, review all players results",
      target: "ft-list",
      placement: "right"
    }
  ]
};

$('#btnStartTour').on('click', function (e) {
  hopscotch.startTour(tour);
});

// Start the tour!
