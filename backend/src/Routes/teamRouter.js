const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getTeams,
  createTeam,
  joinTeam,
  leaveTeam,
  updateTeam,
  deleteTeam,
  getPendingTeams,
   approveTeam,
   getApproveTeams

} = require('../Controller/teamController');

router.get('/', getTeams);                      // Public
router.post('/teams', auth, createTeam);              // Coach creates team
router.post('/:teamId/join', auth, joinTeam);     // Player joins team
router.post('/:teamId/leave', auth, leaveTeam);   // Player leaves team
router.patch('/:teamId', auth, updateTeam);       // Coach updates team
router.delete('/:teamId', auth, deleteTeam);      // Coach deletes team
router.get('/pending-teams', getPendingTeams); // For admin to view pending teams
router.get('/approved-teams',getApproveTeams)
router.patch('/approve/:teamId',  approveTeam); // For admin to approve team

module.exports = router;
