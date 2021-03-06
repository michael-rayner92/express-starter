## Notes
> Track my sidetracked ventures into tangential features/enhancements
> Tags: *Enhancements, Issues, Questions, Resources, Todos, Urgent*


## Tags

*All tags will be marked by a @@<_tagname_>* 
 - **Enhancement** - *Additional functionality or feature to add in the future*
 - **Issues** - *I'm stuck. More research required*
 - **Questions** - *Non-urgent issues with current understanding added and any useful links*
 - **Resource** - *Useful resource related to feature/code snippet*
 - **Todos** - *To be completed, not urgent*
 - **Urgent** - *Current feature task*

## Other Notes

*Scribblings of a madman and other hopefully useful reminders for the future*

#### To Look Into
- Node process exit/restarts with Heroku
- Testing build flow
- Clean up start scripts
- Clean up unneeded values into config files (Reduce clutter/confusion)

## Old Start Scripts
```
    "start": "node -r tsconfig-paths/register build/server.js",
    "start:prod": "node -r ts-node/register/transpile-only -r tsconfig-paths/register build/server.js"
```
*Don't seem to be needed with current build and nodemon setup*

## TODO List
[] - Finish Team DB Setup
[] - Create and Delete Tenant Routes
**Then?**
[] - Create DB Helpers
[] - Finish Strategy Implementation
[] - Cache DBs with Redis with Hydration
[] - Scheduled BD Backups
[] - Production DB Setup

**Later**
[] - Fix Error Message Duplication (Move Logging into Error Handler)