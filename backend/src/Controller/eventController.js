// const Event = require('../Models/Event');

// // Register user for an event
// exports.registerForEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(
//       req.params.eventId,
//       { $addToSet: { participants: req.user._id } },
//       { new: true }
//     );

//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     res.status(200).json({ message: 'Registered for event successfully', event });
//   } catch (error) {
//     res.status(500).json({ message: 'Registration failed', error: error.message });
//   }
// };

// // Approve an event (Admin)
// exports.approveEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(
//       req.params.eventId,
//       { approved: true },
//       { new: true }
//     );

//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     res.status(200).json({ message: 'Event approved successfully', event });
//   } catch (error) {
//     res.status(500).json({ message: 'Approval failed', error: error.message });
//   }
// };

// // Get all events
// exports.getEvents = async (req, res) => {
//   try {
//     const events = await Event.find()
//       .populate('organizer', 'name email')
//       .populate('participants', 'name email');

//     res.status(200).json({ message: 'Events fetched successfully', events });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching events', error: error.message });
//   }
// };

// // Create a new event
// exports.createEvent = async (req, res) => {
//   try {
//     const event = new Event({
//       ...req.body,
//       organizer: req.user._id
//     });

//     await event.save();

//     res.status(201).json({ message: 'Event created successfully', event });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating event', error: error.message });
//   }
// };


const Event = require('../Models/Event');

const eventSchema = require('../Models/Event')
//get all events 
exports.getAllEvents=async(req,res)=>{
  try{ const events = eventSchema.find();
   res.json(events)}
   catch(err){
console.log("error found in getevnts api..",err)
   }



};
// Register user for an event
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $addToSet: { participants: req.user._id } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Registered for event successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Approve an event (Admin)
exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { approved: true },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event approved successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Approval failed', error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ approved: false })  // <-- filter here
      .populate('coach', 'name email')
      .populate('participants', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({ message: 'Events fetched successfully', events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};
exports.getParticipantEvents = async (req, res) => {
  try {
    const events = await Event.find({ approved: true })  // <-- filter here
      .populate('coach', 'name email')
      .populate('participants', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({ message: 'Events fetched successfully', events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};



// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user._id
    });

    await event.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error("❌ Error in createEvent:", error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};
