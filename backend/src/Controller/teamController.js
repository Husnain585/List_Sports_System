const Team = require('../Models/Team');

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members coach', 'name email');
    res.json({ success: true, teams });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching teams', error: error.message });
  }
};

exports.createTeam = async (req, res) => {
  try {
    const { name, sport, members } = req.body;

    if (!name || !sport || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ success: false, message: "Name, sport, and members are required" });
    }

    const team = new Team({
      name,
      sport,
      members,
      coach: req.user._id
    });

    await team.save();

    res.status(201).json({ success: true, message: "Team created successfully", team });
  } catch (error) {
    console.error("Error in createTeam:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// ✅ Get all pending (not approved) teams
exports.getPendingTeams = async (req, res) => {
  try {
    const teams = await Team.find({ approved: false })
      .populate('members coach createdBy', 'name email'); // ✅ Added createdBy

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending teams', error: error.message });
  }
};




exports.getApproveTeams = async (req, res) => {
  try {
    const teams = await Team.find({ approved: true })
      .populate('members coach createdBy', 'name email'); // ✅ Added createdBy

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending teams', error: error.message });
  }
};



// ✅ Approve a specific team
exports.approveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    team.approved = true;
    await team.save();

    res.json({ message: 'Team approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving team', error: error.message });
  }
};


exports.joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    if (team.members.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Already a member' });
    }

    team.members.addToSet(req.user._id);
    await team.save();
    res.json({ success: true, message: 'Joined team successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error joining team', error: error.message });
  }
};

exports.leaveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    team.members.pull(req.user._id);
    await team.save();
    res.json({ success: true, message: 'Left team successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error leaving team', error: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    if (team.coach.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: 'Only coach can update team' });
    }

    const { name, sport } = req.body;
    if (name) team.name = name;
    if (sport) team.sport = sport;

    await team.save();
    res.json({ success: true, message: 'Team updated successfully', team });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating team', error: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    if (team.coach.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: 'Only coach can delete team' });
    }

    await team.deleteOne();
    res.json({ success: true, message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting team', error: error.message });
  }
};
