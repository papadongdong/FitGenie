interface UserProfile {
  age?: number;
  gender?: string;
  height?: number; // in cm
  weight?: number; // in kg
  activityLevel?: string;
  fitnessGoals?: string[];
  dietaryRestrictions?: string[];
  allergies?: string;
}

const USER_PROFILE_KEY = 'fitgenius_user_profile';

export function getUserProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(USER_PROFILE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save user profile:', error);
  }
}

export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const currentProfile = getUserProfile();
  const updatedProfile = { ...currentProfile, ...updates };
  saveUserProfile(updatedProfile);
  return updatedProfile;
}

export function clearUserProfile(): void {
  try {
    localStorage.removeItem(USER_PROFILE_KEY);
  } catch (error) {
    console.error('Failed to clear user profile:', error);
  }
}
