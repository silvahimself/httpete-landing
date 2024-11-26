import { Award, Check } from "lucide-react"
import { useState } from "react";

const userAchievements = [
    {
        title: 'Endpoint Padawan',
        description: 'Tested 10 Endpoints',
        icon: '🌟',
    },
    {
        title: 'Doc Padawan',
        description: 'Authored 50 documents',
        icon: '📝',
    },
    {
        title: 'First Request',
        description: 'Sent your first API request',
        icon: '🚀',
    },
    {
        title: 'Team Collaborator',
        description: 'Shared 5 projects with your team',
        icon: '🤝',
    },
    {
        title: 'Method Explorer',
        description: 'Used all HTTP methods at least once',
        icon: '🔍',
    },
    {
        title: 'Collection Keeper',
        description: 'Created 10 collections',
        icon: '📦',
    },
    {
        title: 'Variable Virtuoso',
        description: 'Used 20 variables in your requests',
        icon: '🔧',
    },
    {
        title: 'Header Hero',
        description: 'Configured custom headers for 15 requests',
        icon: '📋',
    },
    {
        title: 'Automation Beginner',
        description: 'Set up 5 automated test scripts',
        icon: '🤖',
    }
];

const allAchievements = [
    // Endpoint Testing Achievements
    { title: 'Endpoint Newbie', description: 'Tested 1 Endpoint', icon: '📍' },
    { title: 'Endpoint Padawan', description: 'Tested 10 Endpoints', icon: '🌟' },
    { title: 'Endpoint Adept', description: 'Tested 50 Endpoints', icon: '🛠️' },
    { title: 'Endpoint Specialist', description: 'Tested 100 Endpoints', icon: '🏅' },
    { title: 'Endpoint Pro', description: 'Tested 250 Endpoints', icon: '🏆' },
    { title: 'Endpoint Master', description: 'Tested 1,000 Endpoints', icon: '🥇' },
    { title: 'Endpoint Guru', description: 'Tested 5,000 Endpoints', icon: '🌀' },
    { title: 'Endpoint Legend', description: 'Tested 10,000 Endpoints', icon: '🔥' },

    // Documentation Achievements
    { title: 'Doc Apprentice', description: 'Authored 10 documents', icon: '📄' },
    { title: 'Doc Padawan', description: 'Authored 50 documents', icon: '📝' },
    { title: 'Doc Specialist', description: 'Authored 100 documents', icon: '📘' },
    { title: 'Doc Creator', description: 'Authored 250 documents', icon: '📚' },
    { title: 'Doc Pro', description: 'Authored 500 documents', icon: '🏆' },
    { title: 'Doc Master', description: 'Authored 1,000 documents', icon: '🥇' },
    { title: 'Doc Sage', description: 'Authored 5,000 documents', icon: '🌌' },
    { title: 'Doc Legend', description: 'Authored 10,000 documents', icon: '📜' },

    // General Usage Achievements
    { title: 'First Request', description: 'Sent your first API request', icon: '🚀' },
    { title: 'Five Alive', description: 'Sent 5 API requests', icon: '✋' },
    { title: 'Request Enthusiast', description: 'Sent 50 API requests', icon: '📡' },
    { title: 'Request Expert', description: 'Sent 250 API requests', icon: '💻' },
    { title: 'Request Addict', description: 'Sent 1,000 API requests', icon: '🔗' },
    { title: 'Request Machine', description: 'Sent 10,000 API requests', icon: '⚙️' },

    // Team Collaboration Achievements
    { title: 'Team Player', description: 'Shared your first project with a team', icon: '🤝' },
    { title: 'Team Collaborator', description: 'Shared 5 projects with your team', icon: '🤝' },
    { title: 'Team Leader', description: 'Shared 20 projects with your team', icon: '👑' },
    { title: 'Team Builder', description: 'Shared 50 projects with your team', icon: '🛠️' },
    { title: 'Team Mentor', description: 'Shared 100 projects with your team', icon: '🎓' },

    // HTTP Method Achievements
    { title: 'Method Explorer', description: 'Used all HTTP methods at least once', icon: '🔍' },
    { title: 'GET Pro', description: 'Sent 100 GET requests', icon: '📥' },
    { title: 'POST Pro', description: 'Sent 100 POST requests', icon: '📤' },
    { title: 'PUT Pro', description: 'Sent 50 PUT requests', icon: '✏️' },
    { title: 'DELETE Pro', description: 'Sent 50 DELETE requests', icon: '❌' },
    { title: 'Method Master', description: 'Used 1,000 HTTP methods', icon: '🔄' },

    // Collections Achievements
    { title: 'Collection Newbie', description: 'Created your first collection', icon: '📂' },
    { title: 'Collection Keeper', description: 'Created 10 collections', icon: '📦' },
    { title: 'Collection Architect', description: 'Created 50 collections', icon: '🏗️' },
    { title: 'Collection Pro', description: 'Created 100 collections', icon: '🏆' },
    { title: 'Collection Legend', description: 'Created 500 collections', icon: '🌟' },

    // Variable Usage Achievements
    { title: 'Variable Beginner', description: 'Used your first variable', icon: '🔢' },
    { title: 'Variable User', description: 'Used 10 variables', icon: '🔠' },
    { title: 'Variable Virtuoso', description: 'Used 20 variables in your requests', icon: '🔧' },
    { title: 'Variable Guru', description: 'Used 100 variables in your requests', icon: '🛠️' },

    // Header Configuration Achievements
    { title: 'Header Rookie', description: 'Configured a custom header', icon: '📋' },
    { title: 'Header Hero', description: 'Configured custom headers for 15 requests', icon: '📋' },
    { title: 'Header Master', description: 'Configured custom headers for 100 requests', icon: '🏆' },

    // Automation and Testing Achievements
    { title: 'Automation Beginner', description: 'Set up 5 automated test scripts', icon: '🤖' },
    { title: 'Automation Enthusiast', description: 'Set up 20 automated test scripts', icon: '⚙️' },
    { title: 'Automation Expert', description: 'Set up 100 automated test scripts', icon: '🛠️' },

    // Speed and Performance Achievements
    { title: 'Quick Tester', description: 'Completed 5 requests in under 10 seconds', icon: '⚡' },
    { title: 'Speed Runner', description: 'Completed 50 requests in under 10 seconds', icon: '🏎️' },

    // Advanced Features Achievements
    { title: 'Environment Explorer', description: 'Set up your first environment', icon: '🌍' },
    { title: 'Environment Pro', description: 'Set up 10 environments', icon: '🗺️' },
    { title: 'Mock Server Creator', description: 'Created your first mock server', icon: '🛠️' },
    { title: 'Mock Server Pro', description: 'Created 10 mock servers', icon: '🏗️' },

    // Miscellaneous Achievements
    { title: 'Persistent Pro', description: 'Logged in for 30 consecutive days', icon: '📆' },
    { title: 'Feedback Giver', description: 'Submitted your first feedback', icon: '🗣️' },
    { title: 'UI Explorer', description: 'Visited all tabs in the app', icon: '🖥️' },
    { title: 'API Conqueror', description: 'Mastered all basic features of HttPete', icon: '🚀' },
];

const Achievements = (expanded: boolean) => {
    const [maxAchievementsShowing, setMaxAchievementsShowing] = useState(10);
    
    return (
        <div style={{margin:'2rem'}}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="w-6 h-6 text-red-500 mr-2" />
                Your Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userAchievements.map(x =>
                    <div className="bg-gray-500 p-4 rounded-lg flex items-center">
                        <span className="text-2xl mr-3">{x.icon}</span>
                        <div className="flex flex-row">
                        <div className="w-48">
                            <h4 className="font-semibold">{x.title}</h4>
                            <p className="text-sm text-gray-400">Created 100 API tests</p>
                        </div>
                        <div className="w-2">
                            <Check color="green" style={{backgroundColor:'white', borderRadius:'100%', width:'25px', height:'25px'}}/>
                        </div>
                        </div>
                    </div>
                )}
                
                {allAchievements.slice(0, maxAchievementsShowing - userAchievements.length).map((x) =>
                    <div className="bg-gray-800 p-4 rounded-lg flex items-center">
                        <span className="text-2xl mr-3">{x.icon}</span>
                        <div>
                            <h4 className="font-semibold">{x.title}</h4>
                            <p className="text-sm text-gray-400">Created 100 API tests</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Achievements;