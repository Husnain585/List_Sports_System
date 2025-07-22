const usersSchema = require("../Models/usersSchema");
// Supported roles and approval statuses to prevent invalid queries
const VALID_ROLES = ['admin', 'coach', 'participant'];
const VALID_APPROVAL_STATUSES = ['pending', 'approved', 'rejected'];
const responseHandler = require("../../responseHandler");
module.exports = {
    getAllUser : async (req, res) => {s
        try {
            const { role, approvalStatus } = req.query;
            const filter = {};
            // Validate and add role filter
            if (role) {
              if (!VALID_ROLES.includes(role)) {
                return responseHandler(res, {
                  error: `Invalid role. Valid roles are: ${VALID_ROLES.join(', ')}`,
                  statusCode: 400
                });
              }
              filter.role = role;
            }
        
            // Validate and add approvalStatus filter
            if (approvalStatus) {
              if (!VALID_APPROVAL_STATUSES.includes(approvalStatus)) {
                return responseHandler(res, {
                  error: `Invalid status. Valid statuses are: ${VALID_APPROVAL_STATUSES.join(', ')}`,
                  statusCode: 400
                });
              }
              filter.approved = approvalStatus === 'approved';
              if (approvalStatus === 'pending') {
                filter.$or = [
                  { approved: false, approvedByCoach: { $exists: false } },
                  { approvedByCoach: false }
                ];
              }
            }
        
            // Efficient projection to exclude password and include only needed fields
            const users = await usersSchema.find(filter)
              .select('_id name email role approved approvedByCoach createdAt')
              .lean();
        
            return responseHandler(res, {
              response: users,
              message: 'Users fetched successfully'
            });
        
          } catch (error) {
            console.error('Error fetching users:', error);
            return responseHandler(res, {
              error: 'Server error while fetching users',
              statusCode: 500,
              errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
          }
    }
}