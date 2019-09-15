$(function () {

  $('#search').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });

  $score = 0;
  $quiz_ID = 1;
  var count = '';
  var questions = '';
  var arrangeVar = '';
  var arrangeID = '';
  var arrangeNumbering = 1;
  var trueFalseID = '';
  var totalScore = 0;
  var arr = [];
  var arr2 = [];
  var totalAns = 0;
  var selectedLimit = 0;

  globalVariables = function() {
    $score = 0;
    $quiz_ID = 1;
    count = '';
    questions = '';
    arrangeVar = '';
    arrangeID = '';
    arrangeNumbering = 1;
    trueFalseID = '';
    totalScore = 0;
    arr = [];
    arr2 = [];
    totalAns = 0;
    selectedLimit = 0;
  }

  var empData = [
    {
      "id": 1,
      "empName": "Afnan Ahmad"
    },
    {
      "id": 2,
      "empName": "Abdullah Faraz"
    },
    {
      "id": 3,
      "empName": "Abubakar Siddiq"
    },
    {
      "id": 4,
      "empName": "Mehmood Hammad"
    },
    {
      "id": 5,
      "empName": "M Yasir"
    }
  ];

  var detail = [
    {
      "id": 1,
      "name": "Afnan Ahmad",
      "tests": [
        {
          "test": "Test One",
          "score": 80
        },
        {
          "test": "Test Two",
          "score": "failed"
        },
        {
          "test": "Test Three",
          "score": 78
        }
      ]
    },
    {
      "id": 2,
      "name": "Abdullah Faraz",
      "tests": [
        {
          "test": "Test One",
          "score": 80
        },
        {
          "test": "Test Two",
          "score": null
        },
        {
          "test": "Test Three",
          "score": 80
        }
      ]
    },
    {
      "id": 3,
      "name": "Abubakar Siddiq",
      "tests": [
        {
          "test": "Test One",
          "score": 79
        },
        {
          "test": "Test Two",
          "score": "failed"
        },
        {
          "test": "Test Three",
          "score": null
        }
      ]
    },
    {
      "id": 4,
      "name": "Mehmood Hammad",
      "tests": [
        {
          "test": "Test One",
          "score": "failed"
        },
        {
          "test": "Test Two",
          "score": null
        },
        {
          "test": "Test Three",
          "score": 88
        }
      ]
    },
    {
      "id": 5,
      "name": "M Yasir",
      "tests": [
        {
          "test": "Test One",
          "score": "failed"
        },
        {
          "test": "Test Two",
          "score": 80
        },
        {
          "test": "Test Three",
          "score": 95
        }
      ]
    }
  ];

  //  This is for the search bar
  $('#search').typeahead({
    name: 'employees',
    limit: 10,
    minLength: 1,
    source: function (query, process) {
      employees = [];
      map = {};

      // $.get('' ,function(data) {
        $.each(empData, function (i, employee) {
          map[employee.empName] = employee;
          employees.push(employee.empName);
        });
      // }

      process(employees);
    },
    afterSelect: function(name) {
      $('#quizName').html('');
      $('#nav_menu button:not(#first):not(#second):not(#third)').remove();
      $('#testContainer').empty();

      $passed = $('#passed');
      $failed = $('#failed');
      $remaining = $('#remaining');

      $('#passed').empty();
      $('#failed').empty();
      $('#remaining').empty();

      $pass_link = '';
      $fail_link = '';
      $remain_link = '';
      $.each(detail, function(i, one) {
        if(one.name == name) {
          $.each(one.tests, function(j, two) {
            if(two.score == null) {
              $remain_link += '<li id="remainID" style="cursor: pointer;">';
              $remain_link += '<a href="javascript:void(0)"';
              $remain_link += ' onclick="callQuiz(\'' + two.test + '\')"';
              $remain_link += ' ">';
              $remain_link += two.test;
              $remain_link += '</a></li>';
            }else if(two.score == 'failed') {
              $fail_link += '<li id="failID" style="cursor: pointer;">';
              $fail_link += '<a href="javascript:void(0)"';
              $fail_link += ' onclick="callQuiz(\'' + two.test + '\')"';
              $fail_link += ' ">';
              $fail_link += two.test;
              $fail_link += '</a></li>';
            }else {
              $pass_link += '<li id="passID" style="cursor: pointer;">';
              $pass_link += '<a href="javascript:void(0)"';
              $pass_link += ' onclick="callQuiz(\'' + two.test + '\')"';
              $pass_link += ' ">';
              $pass_link += two.test+' ('+two.score+'%) ';
              $pass_link += '</a></li>';
            }
          });
        }
      });
      $remaining.append($remain_link);
      $failed.append($fail_link);
      $passed.append($pass_link);
      $("#passedClick").trigger( "click" );
    }
  });
  
  callQuiz = function($testNo) {
    $('#quizName').html('');
    $('#quizName').html($testNo);

    // Just to set the global variables to default values
    globalVariables();

    // $("#abc").trigger( "click" );
    $("#refreshBtn").html('');

    // Check which test is clicked
    if($testNo === 'Test One') {
      questions = questions_1;
      count = Object.keys(questions_1).length;

    }else if($testNo === 'Test Two') {
      questions = questions_2;
      count = Object.keys(questions_2).length;

    }else if($testNo === 'Test Three') {
      questions = questions_3;
      count = Object.keys(questions_3).length;

    }else {

    }

    //  Populate question no. in the nav_bar
    $('#nav_menu button:not(#first):not(#second):not(#third)').remove();
    $nav_menu = $('#nav_menu');

    //  Question numbering on the top
    $query = '';
    $.each(questions, function(i, one) {
      $query += '<button type="button" id="' + one.id + '" class="btn ml-3 btn-sm btn-light" onclick="question_no(\'' + one.id + '\')">';
      $query += one.id;
      $query += '</button>';
    });
    $nav_menu.append($query);

    startQuiz();
  }

  startQuiz = function() {
    $('#nav_menu button').removeAttr('disabled', 'disabled');

    $("#refreshBtn").empty();
    
    //  Populate questions
    $('#nextBtn').show();

    $('#nextBtn').empty();
    $('#testContainer').empty();
    $testContainer = $('#testContainer');
    $quizArray = '';
    $outputArrange = '';
    
    $.each(questions, function(i, one) {
      if(one.id == $quiz_ID) {
        totalAns = 0;

        $quizArray += '<h5>';
        $quizArray += one.q;
        $quizArray += '</h5>';

        if(one.type == 'mcQs') {
          selectedLimit = 0;

          $.each(questions, function(i, one) {
            if(one.id == $quiz_ID) {
              totalAns += Object.keys(one.correct).length;
            }
          });

          $('#qType').html('');
          $qType = $('#qType');
          $qType.append('Click the correct once.');
          $nameAndID = '';

          $.each(one.options, function(j, two) {
            $quizArray += '<ul class="mt-4">';
            $quizArray += '<li class="custom-control custom-checkbox">';
            $quizArray += '<input type="checkbox"';

            $nameAndID = one.name+two.ansID;
            if(jQuery.inArray($nameAndID, arr) != -1) { //  Check if previously user checked it
              $quizArray += ' checked'
              selectedLimit++;  //  this is just to disable the uncheck checkboxes if user already max checkboxes
            }

            $quizArray += ' class="custom-control-input" id="' + two.ansID + '" onclick="storeMcqs(\'' + one.id + '\', \'' + one.name + '\', \''+ two.ansID +'\')"';
            $quizArray += '" value="';
            $quizArray += two.ans;
            $quizArray += '" /><label class="custom-control-label" for="' + two.ansID + '">';
            $quizArray += two.ans;
            $quizArray += '</label></li>';
            $quizArray += '</ul>';
          });

          $nextBtn = $('#nextBtn');
          $nextBtn.append('<button id="nextBtn" onclick="next_mcQs(\''+ one.id +'\')" class="btn btn-success mb-2">Next</button> ');

        }else if(one.type == 'arrange') {
          $('#qType').html('');
          $qType = $('#qType');
          $qType.append('Click the correct order.');
          arrangeNumbering = 1;

          arrangeID = one.id;

          $quizArray += '<div class="list-group"><div class="row" id="arrangeRow">';
          $.each(one.options, function(j, two) {
            $quizArray += '<button type="button"';
            $quizArray += ' onclick="storeArrange(\'' + one.id + '\', \'' + one.name + '\', \''+ two.ansID +'\', \''+ two.ans +'\')"';
            $quizArray += ' id="'+two.ansID+'"';

            $nameAndID = one.name+two.ansID;
            if(jQuery.inArray($nameAndID, arr) != -1) {
              $quizArray += ' style="display: none;"';
            }

            $quizArray += ' class="list-group-item custom-btn mt-3 ml-2 col-3 list-group-item-action">';
            $quizArray += two.ans;
            $quizArray += '</button>';

            $nameAndID = one.name+two.ansID;
            if(jQuery.inArray($nameAndID, arr) != -1) {

              setTimeout(function() {
                $("#refreshBtn button").css("display", "block");
              }, 1000);

              $outputArrange += '<button type="button" id="'+two.ansID+'" class="list-group-item mt-3 ml-2 col-3 list-group-item-action">'+'<b>'+arrangeNumbering+':</b> '+two.ans+'</button>';
              arrangeNumbering++;
            }

          });
          $quizArray += '</div></div>';
          $quizArray += '<hr style="border: 2px solid green; width: 692px;">';

          //  This is for the output of arrangement
          $quizArray += '<div class="list-group"><div class="row" id="outputArrange"></div></div>';

          $nextBtn = $('#nextBtn');
          $nextBtn.append('<button id="nextBtn" onclick="next_arrange(\''+ one.id +'\')" class="btn btn-success mb-2">Next</button> ');
          
          $refreshBtn = $('#refreshBtn');
          $refreshBtn.append('<button id="refreshBtn" style="display: none;" onclick="refreshArrange(\''+ one.name +'\')" class="btn btn-outline-success mb-2"><i class="fa fa-refresh"></i></button>');

        }else if(one.type == 'trueFalse') {
          $('#qType').html('');
          $qType = $('#qType');
          $qType.append('True and False.');

          trueFalseID = one.id;

          $.each(one.options, function(j, two) {
            $quizArray += '<div class="custom-control mt-4 custom-radio">';
            $quizArray += '<input type="radio"';

            $nameAndID = one.name+two.ansID;
            if(jQuery.inArray($nameAndID, arr) != -1) {
              $quizArray += ' checked'
            }

            $quizArray += ' id="'+two.ansID+'"';
            $quizArray += ' value="'+two.ansID+'"';
            $quizArray += ' name="customRadio" onclick="storeTrueFalse(\'' + one.id + '\', \'' + one.name + '\', \''+ two.ansID +'\')" class="custom-control-input mt-2">';
            $quizArray += '<label class="custom-control-label"';
            $quizArray += ' for="'+two.ansID+'">';
            $quizArray += two.ansID;
            $quizArray += '</label></div>';

          });

          $nextBtn = $('#nextBtn');
          $nextBtn.append('<button id="nextBtn" onclick="next_trueFalse(\''+ one.id +'\')" class="btn btn-success mb-2">Next</button> ');

        }else {

        }
      }
    });
    $testContainer.append($quizArray);
    $('#outputArrange').append($outputArrange);
    //  this is to disable the checkboxes if user already checked the max
    if(selectedLimit == totalAns) {
      $('#testContainer input[type=checkbox]:not(:checked)').attr('disabled', 'disabled');
    }
    $quiz_ID++;
  }

  //  Show question by its id
  question_no = function($id) {
    $("#refreshBtn").empty();
    $quiz_ID = $id;
    //  Populate question
    $('#nextBtn').show();

    $('#nextBtn').empty();
    $('#testContainer').empty();
    $testContainer = $('#testContainer');
    $quizArray = '';
    $outputArrange = '';
    
    $.each(questions, function(i, one) {
      if(one.id == $quiz_ID) {
        totalAns = 0;

        $quizArray += '<h5>';
        $quizArray += one.q;
        $quizArray += '</h5>';

        if(one.type == 'mcQs') {
          selectedLimit = 0;

          $.each(questions, function(i, one) {
            if(one.id == $quiz_ID) {
              totalAns += Object.keys(one.correct).length;
            }
          });

          $('#qType').html('');
          $qType = $('#qType');
          $qType.append('Click the correct once.');
          $nameAndID = '';

          $.each(one.options, function(j, two) {
            $quizArray += '<ul class="mt-4">';
            $quizArray += '<li class="custom-control custom-checkbox">';
            $quizArray += '<input type="checkbox"';

            $nameAndID = one.name+two.ansID;
            if(jQuery.inArray($nameAndID, arr) != -1) { //  Check if previously user checked it
              $quizArray += ' checked'
              selectedLimit++;  //  this is just to disable the uncheck checkboxes if user already max checkboxes
            }

            $quizArray += ' class="custom-control-input" id="' + two.ansID + '" onclick="storeMcqs(\'' + one.id + '\', \'' + one.name + '\', \''+ two.ansID +'\')"';
            $quizArray += '" value="';
            $quizArray += two.ans;
            $quizArray += '" /><label class="custom-control-label" for="' + two.ansID + '">';
            $quizArray += two.ans;
            $quizArray += '</label></li>';
            $quizArray += '</ul>';
          });

          $nextBtn = $('#nextBtn');
          $nextBtn.append('<button id="nextBtn" onclick="next_mcQs(\''+ one.id +'\')" class="btn btn-success mb-2">Next</button> ');

        }else if(one.type == 'arrange') {
          $('#qType').html('');
          $qType = $('#qType');
          $qType.append('Click the correct order.');
          arrangeNumbering = 1;

          arrangeID = one.id;

          $quizArray += '<div class="list-group"><div class="row" id="arrangeRow">';
          $.each(one.options, function(j, two) {
            $quizArray += '<button type="button"';
            $quizArray += ' onclick="storeArrange(\'' + one.id + '\', \'' + one.name + '\', \''+ two.ansID +'\', \''+ two.ans +'\')"';
            $quizArray += ' id="'+two.ansID+'"';

            $nameAndID = one.name+two.ansID;
            if(jQuery.inArray($nameAndID, arr) != -1) {
              $quizArray += ' style="display: none;"';
            }

            $quizArray += ' class="list-group-item custom-btn mt-3 ml-2 col-3 list-group-item-action">';
            $quizArray += two.ans;
            $quizArray += '</button>';

            if(jQuery.inArray($nameAndID, arr) != -1) {

              setTimeout(function() {
                $("#refreshBtn button").css("display", "block");
              }, 1000);
              
              $outputArrange += '<button type="button" id="'+two.ansID+'" class="list-group-item mt-3 ml-2 col-3 list-group-item-action">'+'<b>'+arrangeNumbering+':</b> '+two.ans+'</button>';
              arrangeNumbering++;
            }

          });
          $quizArray += '</div></div>';
          $quizArray += '<hr style="border: 2px solid green; width: 692px;">';

          //  This is for the output of arrangement
          $quizArray += '<div class="list-group"><div class="row" id="outputArrange"></div></div>';

          $nextBtn = $('#nextBtn');
          $nextBtn.append('<button id="nextBtn" onclick="next_arrange(\''+ one.id +'\')" class="btn btn-success mb-2">Next</button> ');
          
          $refreshBtn = $('#refreshBtn');
          $refreshBtn.append('<button id="refreshBtn" style="display: none;" onclick="refreshArrange(\''+ one.name +'\')" class="btn btn-outline-success mb-2"><i class="fa fa-refresh"></i></button>');

        }else if(one.type == 'trueFalse') {
          $('#qType').html('');
          $qType = $('#qType');
          $qType.append('True and False.');
          $nameAndID = '';

          trueFalseID = one.id;

          $.each(one.options, function(j, two) {
            $quizArray += '<div class="custom-control mt-4 custom-radio">';
            $quizArray += '<input type="radio"';

            $nameAndID = one.name+two.ansID;
            if(jQuery.inArray($nameAndID, arr) != -1) {
              $quizArray += ' checked'
            }

            $quizArray += ' id="'+two.ansID+'"';
            $quizArray += ' value="'+two.ansID+'"';
            $quizArray += ' name="customRadio" onclick="storeTrueFalse(\'' + one.id + '\', \'' + one.name + '\', \''+ two.ansID +'\')" class="custom-control-input mt-2">';
            $quizArray += '<label class="custom-control-label"';
            $quizArray += ' for="'+two.ansID+'">';
            $quizArray += two.ansID;
            $quizArray += '</label></div>';

          });

          $nextBtn = $('#nextBtn');
          $nextBtn.append('<button id="nextBtn" onclick="next_trueFalse(\''+ one.id +'\')" class="btn btn-success mb-2">Next</button> ');

        }else {

        }
      }
    });
    $testContainer.append($quizArray);
    $('#outputArrange').append($outputArrange);
    //  this is to disable the checkboxes if user already checked the max
    if(selectedLimit == totalAns) {
      $('#testContainer input[type=checkbox]:not(:checked)').attr('disabled', 'disabled');
    }
    $quiz_ID++;
  }

  storeMcqs = function($id, $name, $ansID) {

    if(jQuery.inArray($name+$ansID, arr) != -1) {
      arr.splice( $.inArray($name+$ansID, arr), 1 );
    }else {
      arr.push($name+$ansID);
      
    }
    $('#'+$id).css('background', '#5cb85c');
    $('#'+$id).css('color', 'white');

    if($('#'+$ansID).is(':checked')) {
      selectedLimit++;
      if(selectedLimit == totalAns) {
        $('#testContainer input[type=checkbox]:not(:checked)').attr('disabled', 'disabled');
      }
    }else if($('#'+$ansID).is(":not(:checked)")) {
      selectedLimit--;
      if(selectedLimit < totalAns) {
        $('#testContainer input[type=checkbox]:not(:checked)').removeAttr('disabled', 'disabled');
      }
    }else {

    }

  }

  storeTrueFalse = function($id, $name, $ansID) {
    $('#'+$id).css('background', '#5cb85c');
    $('#'+$id).css('color', 'white');

    if($ansID == "True") {
      if(jQuery.inArray($name+'True', arr) != -1) {
        
      }else {
        arr.push($name+$ansID);

        if(jQuery.inArray($name+'False', arr) != -1) {
          arr.splice( $.inArray($name+'False', arr), 1 );
        }
        
      }
    }
    if($ansID == "False") {
      if(jQuery.inArray($name+'False', arr) != -1) {
        
      }else {
        arr.push($name+$ansID);

        if(jQuery.inArray($name+'True', arr) != -1) {
          arr.splice( $.inArray($name+'True', arr), 1 );
        }
        
      }
    }
  }

  storeArrange = function($id, $name, $ansID, $ans) {
    $('#'+$id).css('background', '#5cb85c');
    $('#'+$id).css('color', 'white');
    $("#refreshBtn button").css("display", "block");

    arr.push($name+$ansID);
    $('#'+$ansID).hide();

    $('#outputArrange').append('<button type="button" id="'+$ansID+'" class="list-group-item mt-3 ml-2 col-3 list-group-item-action">'+'<b>'+arrangeNumbering+':</b> '+$ans+'</button>');
    arrangeNumbering++;
  }

  refreshArrange = function($name) {
    $("#refreshBtn button").css("display", "none");
    $('#outputArrange').empty();
    var newStr = '';
    var newStr2 = '';

    var ind = '';
    var ind2 = '';
    $len = Object.keys(arr).length;
    
    for(var i = 0; i < $len; i++) {
      $.each(arr, function(index, value) {

        newStr = value.slice(0, 9);
        newStr2 = value.slice(0, 10);

        if(newStr == $name) {
          ind = arr.indexOf(value);
          if (ind > -1) {
            arr.splice(ind, 1);
          }
          return false;

        }else {
          
        }

        if(newStr2 == $name) {
          ind2 = arr.indexOf(value);
          if (ind2 > -1) {
            arr.splice(ind2, 1);
          }
          return false;
        }else {

        }

      });
    }
    arrangeNumbering = 1;
    $('#arrangeRow button').show();
  }
  
  next_mcQs = function($id) {

    if($quiz_ID < count) {
      startQuiz();

    }else if($quiz_ID == count) {
      startQuiz();

    }else if($quiz_ID > count) {
      result();
      

    }else {

    }
  }

  next_arrange = function($id) {

    $("#refreshBtn button").css("display", "none");
    if($quiz_ID < count) {
      startQuiz();

    }else if($quiz_ID == count) {
      startQuiz();

    }else if($quiz_ID > count) {
      result();
      
    }else {

    }
  }

  next_trueFalse = function($id) {

    if($quiz_ID < count) {
      startQuiz();

    }else if($quiz_ID == count) {
      startQuiz();

    }else if($quiz_ID > count) {
      result();
      
    }else {

    }
  }

  result = function() {
    $('#nav_menu button').attr('disabled', 'disabled');
    $('#qType').html('');
    $('#testContainer').empty();
    $('#nextBtn').hide();
    totalScore = 0;

    var ansIDandName = '';

    $.each(questions, function(y, one) {
      if(one.type != 'arrange') {
        $.each(one.correct, function(z, two) {
          ansIDandName = one.name+two.ansID;

          if(jQuery.inArray(ansIDandName, arr) != -1) {
            arr.splice( $.inArray(ansIDandName, arr), 1 );
            $score++;
          }else {
            if($score < 0) {
              $score = 0;
            }
          }

        });
      }
    });

    arr2 = [];
    $.each(questions, function(y, one) {
      if(one.type == 'arrange') {
        var newStr = '';
        var newStr2 = '';
        var ind = '';
        var ind2 = '';
        $len = Object.keys(arr).length;
        for(var i = 0; i < $len; i++) {
          $.each(arr, function(index, value) {

            newStr = value.slice(0, 9);
            newStr2 = value.slice(0, 10);

            if(newStr == one.name) {
              ind = arr.indexOf(value);
              if (ind > -1) {
                arr2.push(value);
                arr.splice(ind, 1);
              }
              return false;

            }else {
              
            }

            if(newStr2 == one.name) {
              ind2 = arr.indexOf(value);
              if (ind2 > -1) {
                arr2.push(value);
                arr.splice(ind2, 1);
              }
              return false;
            }else {

            }

          });
        }
      }
    });

    $.each(questions, function(y, one) {
      if(one.type == 'arrange') {
        $.each(one.correct, function(z, two) {
          ansIDandName = one.name+two.ansID;

          $.each(arr2, function(index, value) {
            if(ansIDandName == value) {
              $score++;
              arr2.splice( $.inArray(value, arr2), 1 );
              
              return false;
            }else {
              if($score < 0) {
                $score = 0;
              }
              arr2.splice( $.inArray(value, arr2), 1 );
              
              return false;
            }
          });
        });
      }
    });

    $.each(questions, function(x, one) {
      totalScore += Object.keys(one.correct).length;
    });

    $percentage = '';
    $percentage = $score/totalScore*100;
    $percentage1 = $percentage.toFixed(1);

    $cont = $('#testContainer');
    if($percentage == 100) {
      $cont.append('<div class="row"><div class="col-2"></div><div class="col"><h3 style="color: #779cf2;">Your percentage is: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + $percentage + '%</h3><h5 class="mt-3" style="color: #5cb85c;">Congrats, You have passed the test.</h5></div></div>');

      $returnEmpName = $('#search').val();
      $returnTestName = $('#quizName').html();

    }else {
      if($percentage >= 70) {
        $cont.append('<div class="row"><div class="col-2"></div><div class="col"><h3 style="color: #779cf2;">Your percentage is: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + $percentage1 + '%</h3><h5 class="mt-3" style="color: #5cb85c;">Congrats, You have passed the test.</h5></div></div>');

        $returnEmpName = $('#search').val();
        $returnTestName = $('#quizName').html();

      }else {
        $cont.append('<div class="row"><div class="col-2"></div><div class="col"><h3 style="color: #779cf2;">Your percentage is: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + $percentage1 + '%</h3><h5 class="mt-3" style="color: #d9534f;">Sorry, you have failed. Please try again after 24 hours.</h5></div></div>');

        $returnEmpName = $('#search').val();
        $returnTestName = $('#quizName').html();

      }
      
    }
  }

  var questions_1 = [
    {
      "id": 1,
      "type": "mcQs",
      "name": "question1",
      "q": "This is the 1st Question of Test One.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        }
      ],
      "correct": [
        {
          "ansID": "Answer1"
        },
        {
          "ansID": "Answer2"
        }
      ]
    },
    {
      "id": 2,
      "type": "arrange",
      "name": "question2",
      "q": "This is the 2nd Question of Test One.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        },
        {
          "ansID": "Answer5",
          "ans": "Answer5"
        },
        {
          "ansID": "Answer6",
          "ans": "Answer6"
        }
      ],
      "correct": [
        {
          "ansID": "Answer6"
        },
        {
          "ansID": "Answer2"
        },
        {
          "ansID": "Answer3"
        },
        {
          "ansID": "Answer1"
        },
        {
          "ansID": "Answer5"
        },
        {
          "ansID": "Answer4"
        }
      ]
    },
    {
      "id": 3,
      "type": 'mcQs',
      "name": "question3",
      "q": "This is the 3rd Question of Test One.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        }
      ],
      "correct": [
        {
          "ansID": "Answer2"
        }
      ]
    },
    {
      "id": 4,
      "type": "trueFalse",
      "name": "question4",
      "q": "This is the 4th Question of Test One.",
      "options": [
        {
          "ansID": "True"
        },
        {
          "ansID": "False"
        }
      ],
      "correct": [
        {
          "ansID": "False"
        }
      ]
    },
    {
      "id": 5,
      "type": "trueFalse",
      "name": "question5",
      "q": "This is the 5th Question of Test One.",
      "options": [
        {
          "ansID": "True"
        },
        {
          "ansID": "False"
        }
      ],
      "correct": [
        {
          "ansID": "False"
        }
      ]
    },
    {
      "id": 6,
      "type": "trueFalse",
      "name": "question6",
      "q": "This is the 6th Question of Test One.",
      "options": [
        {
          "ansID": "True"
        },
        {
          "ansID": "False"
        }
      ],
      "correct": [
        {
          "ansID": "True"
        }
      ]
    }
  ];

  var questions_2 = [
    {
      "id": 1,
      "type": "trueFalse",
      "name": "question1",
      "q": "This is the 1st Question of Test Two.",
      "options": [
        {
          "ansID": "True"
        },
        {
          "ansID": "False"
        }
      ],
      "correct": [
        {
          "ansID": "False"
        }
      ]
    },
    {
      "id": 2,
      "type": "mcQs",
      "name": "question2",
      "q": "This is the 2nd Question of Test Two.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3."
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        },
        {
          "ansID": "Answer5",
          "ans": "Answer5"
        },
        {
          "ansID": "Answer6",
          "ans": "Answer6"
        }
      ],
      "correct": [
        {
          "ansID": "Answer1"
        },
        {
          "ansID": "Answer2"
        },
        {
          "ansID": "Answer5"
        }
      ]
    },
    {
      "id": 3,
      "type": "mcQs",
      "name": "question3",
      "q": "This is the 3rd Question of Test Two.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        },
        {
          "ansID": "Answer5",
          "ans": "Answer5"
        },
        {
          "ansID": "Answer6",
          "ans": "Answer6"
        }
      ],
      "correct": [
        {
          "ansID": "Answer1"
        },
        {
          "ansID": "Answer4"
        },
        {
          "ansID": "Answer6"
        }
      ]
    },
    {
      "id": 4,
      "type": "mcQs",
      "name": "question4",
      "q": "This is the 4th Question of Test Two.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        },
        {
          "ansID": "Answer5",
          "ans": "Answer5"
        },
        {
          "ansID": "Answer6",
          "ans": "Answer6"
        }
      ],
      "correct": [
        {
          "ansID": "Answer6"
        }
      ]
    }
  ];

  var questions_3 = [
    {
      "id": 1,
      "type": "mcQs",
      "name": "question1",
      "q": "This is the 1st Question of Test Three.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        }
      ],
      "correct": [
        {
          "ansID": "Answer2"
        }
      ]
    },
    {
      "id": 2,
      "type": "mcQs",
      "name": "question2",
      "q": "This is the 2nd Question of Test Three.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        }
      ],
      "correct": [
        {
          "ansID": "Answer2"
        },
        {
          "ansID": "Answer4"
        }
      ]
    },
    {
      "id": 3,
      "type": "mcQs",
      "name": "question3",
      "q": "This is the 3rd Question of Test Three.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        },
        {
          "ansID": "Answer5",
          "ans": "Answer5"
        },
        {
          "ansID": "Answer6",
          "ans": "Answer6"
        },
        {
          "ansID": "Answer7",
          "ans": "Answer7"
        },
        {
          "ansID": "Answer8",
          "ans": "Answer8"
        }
      ],
      "correct": [
        {
          "ansID": "Answer3"
        },
        {
          "ansID": "Answer4"
        },
        {
          "ansID": "Answer6"
        },
        {
          "ansID": "Answer7"
        }
      ]
    },
    {
      "id": 4,
      "type": "mcQs",
      "name": "question4",
      "q": "This is the 4th Question of Test Three.",
      "options": [
        {
          "ansID": "Answer1",
          "ans": "Answer1"
        },
        {
          "ansID": "Answer2",
          "ans": "Answer2"
        },
        {
          "ansID": "Answer3",
          "ans": "Answer3"
        },
        {
          "ansID": "Answer4",
          "ans": "Answer4"
        }
      ],
      "correct": [
        {
          "ansID": "Answer4"
        }
      ]
    },
    {
      "id": 5,
      "type": "trueFalse",
      "name": "question5",
      "q": "This is the 5th Question of Test Three.",
      "options": [
        {
          "ansID": "True"
        },
        {
          "ansID": "False"
        }
      ],
      "correct": [
        {
          "ansID": "False"
        }
      ]
    }
  ];

});