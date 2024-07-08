// Function to populate and show the sidebar with district information
function showSidebar(district, candidates, popTotal) {
    var sidebar = document.getElementById('sidebar');
    var sidebarTitle = document.getElementById('sidebar-title');
    var sidebarContent = document.getElementById('sidebar-content');

    sidebarTitle.innerText = `District ${district}`;

    // Convert candidates array to a list
    var candidatesList = '<ul class="list-group">';
    candidates.forEach(candidate => {
        // Remove brackets from candidates' names
        candidate = candidate.replace(/^\[|\]$/g, '');
        candidatesList += `<li class="list-group-item">${candidate}</li>`;
    });
    candidatesList += '</ul>';

    // Format population total with commas
    var formattedPopTotal = popTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    sidebarContent.innerHTML = `
        <div class="accordion" id="sidebarAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingCandidates">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCandidates" aria-expanded="false" aria-controls="collapseCandidates">
                        Candidates
                    </button>
                </h2>
                <div id="collapseCandidates" class="accordion-collapse collapse" aria-labelledby="headingCandidates" data-bs-parent="#sidebarAccordion">
                    <div class="accordion-body">
                        ${candidatesList}
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingPopulation">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePopulation" aria-expanded="false" aria-controls="collapsePopulation">
                        Population Total
                    </button>
                </h2>
                <div id="collapsePopulation" class="accordion-collapse collapse" aria-labelledby="headingPopulation" data-bs-parent="#sidebarAccordion">
                    <div class="accordion-body">
                        <p>${formattedPopTotal}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    sidebar.style.display = 'block';
}

// Add click event listener to the map
map.on("click", "districts-fill", function (e) {
    if (e.features.length > 0) {
        var feature = e.features[0];
        var district = feature.properties.DISTRICT;

        console.log("Feature properties:", feature.properties); // Debugging line to check properties

        // Handle candidates string parsing
        var candidatesStr = feature.properties.candidates || "";
        var candidatesArray = candidatesStr.replace(/\"/g, "").split(",");

        var candidates = candidatesArray.length > 0 && candidatesArray[0] !== "" 
            ? candidatesArray
            : ["No candidates available"];

        var popTotal = feature.properties.pop_total || "N/A";

        showSidebar(district, candidates, popTotal);
    }
});

// Change the cursor to a pointer when over the districts
map.on("mouseenter", "districts-fill", function () {
    map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "districts-fill", function () {
    map.getCanvas().style.cursor = "";
});
