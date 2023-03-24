package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.ResultDTO;
import org.lamisplus.modules.Laboratory.domain.entity.Result;
import org.lamisplus.modules.Laboratory.domain.entity.Test;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.ResultRepository;
import org.lamisplus.modules.Laboratory.repository.TestRepository;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.lamisplus.modules.Laboratory.utility.LabUtils.RESULT_REPORTED;

@Service
@Slf4j
@RequiredArgsConstructor
public class ResultService {
    private final ResultRepository repository;
    private final LabMapper labMapper;
    private final PersonRepository personRepository;
    private final TestRepository testRepository;
    private  final UserService userService;

    public ResultDTO Save(ResultDTO resultDTO){
        Result result = labMapper.toResult(resultDTO);
        //result.setResultReportedBy(SecurityUtils.getCurrentUserLogin().orElse(""));
        result.setUuid(UUID.randomUUID().toString());

        Test test = testRepository.findById(result.getTestId()).orElse(null);
        assert test != null;
        test.setLabTestOrderStatus(RESULT_REPORTED);
        testRepository.save(test);

        result.setPatientUuid(test.getPatientUuid());
        result.setPatientId(test.getPatientId());
        result.setFacilityId(getCurrentUserOrganization());
        log.info("FF: "+result);
        return labMapper.toResultDto(repository.save(result));
    }

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }

    public ResultDTO Update(int order_id, ResultDTO resultDTO){
        Result updated_result = labMapper.toResult(resultDTO);
        return labMapper.toResultDto(repository.save(updated_result));
    }

    public String Delete(Integer id){
        Result labOrder = repository.findById(id).orElse(null);
        repository.delete(labOrder);
        return id.toString() + " deleted successfully";
    }

    public ResultDTO GetResultsById(Integer id){
        return labMapper.toResultDto(repository.findById(id).orElse(null));
    }

    public ResultDTO GetResultsByTestId(Integer TestId){
        List<Result> resultList = repository.findAllByTestId(TestId);

        if(resultList.size() > 0) {
            return labMapper.toResultDto(resultList.get(0));
        }
        else {
            return new ResultDTO();
        }
    }
}
