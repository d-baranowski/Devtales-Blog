package net.devtales.blog.service;

import com.google.common.collect.Sets;
import net.devtales.blog.model.Role;
import net.devtales.blog.model.User;
import net.devtales.blog.repository.RoleRepository;
import net.devtales.blog.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        User admin = new User();
        Role adminRole = new Role();
        adminRole.setName("ADMIN");
        admin.setRoles(Sets.newHashSet(adminRole));
        admin.setUsername("admin");
        admin.setPassword(new BCryptPasswordEncoder().encode("password"));
        userRepository.save(admin);
    }


    public void save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>(roleRepository.findAll()));
        userRepository.save(user);
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
