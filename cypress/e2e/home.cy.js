describe('Work From Home Management System (WFHMS)', () => {
    beforeEach(() => {
      // Set the base URL to your application (adjust if necessary)
      cy.visit('http://localhost:8000/Home/home.html'); // Adjust the URL if necessary
  
      // Optionally, set up local storage for staff ID if needed
      localStorage.setItem("staffID", "160008"); // Set a valid staff ID
    });
  
    // it('should display loading spinner initially', () => {
    //   // Check if the loading spinner is visible when the page loads
    //   cy.get('.loading-container',{ timeout: 10000 }).should('be.visible');
    // });
  
    it('should display welcome message after loading', () => {
      // Wait for the loading to complete
      cy.get('.loading-container').should('not.exist');
  
      // Check if the welcome message is displayed
      cy.get('#clock h2').should('contain.text', 'Welcome');
    });
  
    it('should navigate to apply for WFH', () => {
      // Wait for loading to finish and click the apply button
      cy.get('.apply-btn').click();
      cy.url().should('include', 'http://localhost:8000/Application/application.html');
    });
  
    it('should navigate to manage WFH applications', () => {
      // Wait for loading to finish and click the manage button
      cy.get('.manage-btn').click();
      cy.url().should('include', 'http://localhost:8000/ManageApplication/mapplication.html');
    });
  
    it('should navigate to view own schedule', () => {
      // Wait for loading to finish and click the own schedule button
      cy.get('.btn.btn-info.w-100.action-btn.schedule-btn').click();
      cy.url().should('include', 'http://localhost:8000/ViewOwnSchedule/voSchedule.html');
    });
  
    it('should navigate to view team schedule', () => {
      // Wait for loading to finish and click the team schedule button
      cy.get('.team-schedule-btn').click();
      cy.url().should('include', 'http://localhost:8000/ViewTeamSchedule/vtSchedule.html');
    });
  
    it('should show HR records access button for HR personnel', () => {
      // // Set userRole to 1 (or other HR identifier) in local storage
      // localStorage.setItem("staffID", "160008"); // Replace with an actual HR user ID
      // cy.reload(); // Reload the page to apply changes
      // // Check if the HR records access button is visible
      cy.get('.btn.btn-warning.w-100.action-btn.logout-btn',{ timeout: 10000 }).contains('HR Records Access - HR Personnel Only').should('be.visible');
    });
  
    it('should log out and redirect to login page', () => {
      // Click the logout button
      cy.get('.logout-btn').contains('Log Out').click();
      cy.url().should('include', 'http://localhost:8000/Login&Authentication/login.html');
    });
  
    it('should show notification toast messages', () => {
      // Check for the toast notification when applying for WFH
      cy.get('.apply-btn').click();
      cy.get('.toast-body').should('contain.text', 'Auto Redirecting to apply for Work From Home.');
      cy.get('.toast').should('be.visible');
      
      // Wait for the notification to disappear
      cy.wait(2000); // Adjust this timeout based on your app's behavior
      cy.get('.toast').should('not.exist');
    });
  });
  