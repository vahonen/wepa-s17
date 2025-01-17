import TmcClient from 'tmc-client-js';
import * as store from 'store';

const client = new TmcClient();

function getCourseName() {
  return store.get('tmc.course');
}

function getWepaSyksy17Config() {
  return {
    courseId: '266',
    courseName: 'Web-palvelinohjelmointi',
    exerciseGroups: {
      'Set 1': ['31.10.2017 12:00', '10.11.2017 23:59', 'set01-'],
      'Set 2': ['06.11.2017 18:00', '17.11.2017 23:59', 'set02-'],
      'Set 3': ['16.11.2017 18:00', '24.11.2017 23:59', 'set03-'],
      'Set 4': ['22.11.2017 18:00', '01.12.2017 23:59', 'set04-'],
      'Set 5': ['30.11.2017 12:00', '08.12.2017 23:59', 'set05-'],
      'Set 6': ['07.12.2017 20:00', '15.12.2017 23:59', 'set06-'],
      'Set 7': ['14.12.2017 20:00', '22.12.2017 23:59', 'set07-']
    }
  };
}

function getConfig() {
  const courseName = getCourseName();

  switch(courseName) {
    case 'hy-wepa-s17':
      return getWepaSyksy17Config();
      break;
    default:
      return getWepaSyksy17Config();
  }
}

function init() {
  const courseName = getCourseName();

  if(courseName === '2017-ohjelmointi-nodl') {
    return;
  }

  const user = client.getUser();

  const config = Object.assign({}, getConfig(), { accessToken: user.accessToken, userId: user.username });

  window.StudentDashboard.initialize(config);
}

function initStudentDashboard() {
  if(!window._STUDENT_DASHBOARD_ENABLED) {
    return;
  }

  if(window.StudentDashboard) {
    init();
  } else {
    document.addEventListener('studentDashboardLoaded', init);
  }
}

export default initStudentDashboard;
